import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamesRepositoryService } from '../../core/repositories/games-repository.service';
import { CreateGameRequest } from '../../core/requests/game/create-game.request';
import { Router } from '@angular/router';
import { GameAlreadyCreated } from 'src/app/core/models/error-codes';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss']
})
export class CreatePartyComponent implements OnInit {

  public form : FormGroup;
  public createing : boolean = false;

  constructor (private formBuilder : FormBuilder, private gamesRepository : GamesRepositoryService, private router : Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      primaryLanguage: ['PL', [Validators.required]],
      maxQuestions: [5, [Validators.required, Validators.min(5), Validators.max(25)]],
    });
  }

  public get valid() {
    return this.form.valid;
  }

  public submit() {
    if (!this.valid) return;

    this.createing = true;

    const { name, primaryLanguage, maxQuestions } = this.form.value;

    this.gamesRepository.create(new CreateGameRequest(name, primaryLanguage, maxQuestions))
      .subscribe(
        x => this.router.navigate(['/game', x.id]),
        e => {
          if (e.error && e.error.error.code == GameAlreadyCreated) {
            this.submit();
          }
          this.createing = false;
        }
      );
  }

  public goBack() {
    this.router.navigate(['/']);
  }

}
