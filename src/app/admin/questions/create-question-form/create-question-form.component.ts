import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { QuestionsRepositoryService } from '../../../core/repositories/questions-repository.service';
import { CreateQuestionRequest } from '../../../core/requests/question/create-question.request';

@Component({
  selector: 'app-create-question-form',
  templateUrl: './create-question-form.component.html',
  styleUrls: ['./create-question-form.component.scss']
})
export class CreateQuestionFormComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private questionsRepository : QuestionsRepositoryService) { }

  public form : FormGroup;

  @Output() public created : EventEmitter<string> = new EventEmitter<string>();

  public addChoice() : void {
    (this.form.get('choices') as FormArray).push(
      this.formBuilder.group({
        answer: ['', Validators.required],
        isCorrect: [false],
        translations: this.formBuilder.group({
          PL: ['', Validators.required],
          EN: ['', Validators.required]
        })
      })
    );
  }

  public removeChoice(i : number) : void {
    (this.form.get('choices') as FormArray).removeAt(i);
  }

  public get choices(): FormArray {
    return this.form.get('choices') as FormArray;
  }

  public get valid() {
    return this.form.valid;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      query: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
      time: [0, [Validators.min(10000), Validators.max(120000)]],
      choices: this.formBuilder.array([], [Validators.minLength(2), Validators.maxLength(6)]),
      translations: this.formBuilder.group({
        PL: ['', Validators.required],
        EN: ['', Validators.required]
      })
    });

    this.addChoice();
    this.addChoice();
  }

  public submit() {
    if (!this.valid) return;

    const { query, image, time, choices, translations } = this.form.value;

    this.questionsRepository.create(new CreateQuestionRequest(query, image, time, choices, translations))
      .subscribe(x => this.created.emit(x.id));
  }

}
