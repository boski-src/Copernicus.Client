import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../core/services/session.service';
import { AuthService } from '../core/services/auth.service';
import { Account } from '../core/models/account/account.model';
import { GamesRepositoryService } from '../core/repositories/games-repository.service';
import { FetchByCodeRequest } from '../core/requests/game/fetch-by-code.request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private sessionService : SessionService,
    private authService : AuthService,
    private gamesRepository : GamesRepositoryService,
    private router : Router
  ) { }

  public gameCodeControl : FormControl = this.formBuilder.control(null, [
    Validators.required,
    Validators.min(1000000),
    Validators.max(9999999)
  ]);

  public get gameCodeValid() : boolean {
    return this.gameCodeControl.valid;
  }

  public get account() : Account {
    return this.sessionService.me;
  }

  public get isLogged() : boolean {
    return this.sessionService.isLogged;
  }

  public get isAdmin() : boolean {
    return this.sessionService.isAdmin;
  }

  public login() : void {
    this.authService.facebookLogin();
  }

  public logout() : void {
    this.sessionService.destroy();
  }

  public searchGame() {
    if (!this.gameCodeValid) return;

    this.gamesRepository.fetchDetailsByCode(new FetchByCodeRequest(this.gameCodeControl.value.toString()))
      .subscribe(
        x => this.router.navigate(['/game', x.id, 'join']),
        () => this.gameCodeControl.reset()
      );
  }

  public setLanguage(code : string) {
    localStorage.setItem('language', code);
    window.location.reload();
  }

  ngOnInit() {
  }

}
