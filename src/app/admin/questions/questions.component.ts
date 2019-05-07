import { Component, OnInit } from '@angular/core';

import { Question } from '../../core/models/question/question.model';
import { QuestionsRepositoryService } from '../../core/repositories/questions-repository.service';
import { PagedQueryRequest } from '../../core/requests/paged-query.request';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  public createShow : boolean = false;
  public questions : Question[];
  public page = 1;

  public searchControl : FormControl = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  constructor(private questionsRepository : QuestionsRepositoryService, private formBuilder : FormBuilder) { }

  public loadMore() {
    this.page++;
    this.loadQuestions();
  }

  public forceReset() {
    this.createShow = false;
    this.page = 1;
    this.questions = [];
  }

  public onCreatedQuestion() {
    this.forceReset();
    this.loadQuestions();
  }

  public deleteQuestion(id : string) {
    this.questionsRepository
      .delete(id)
      .subscribe(
        () => {
          var index = this.questions.findIndex(x => x.id == id);
          this.questions.splice(index, 1);
        }
      );
  }

  public findQuestions() {
    if (!this.searchControl.valid) {
      this.ngOnInit();
      return;
    }

    this.questionsRepository
      .search(this.searchControl.value)
      .subscribe(
        x => {
          this.questions = [];
          this.questions = x;
        }
      );
  }

  ngOnInit() {
    this.forceReset();

    this.loadQuestions();
  }

  public loadQuestions() {
    this.questionsRepository
      .fetchAllPaginate(new PagedQueryRequest(this.page, 30))
      .subscribe(
        x => this.questions.push(...x),
        () => setTimeout(() => this.ngOnInit(), 5000)
      );
  }

}
