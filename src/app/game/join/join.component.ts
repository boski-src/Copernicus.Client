import { Component, OnInit } from '@angular/core';
import { Game } from '../../core/models/game/game.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesRepositoryService } from '../../core/repositories/games-repository.service';
import { GameAlreadyMember } from '../../core/models/error-codes';
import { Ended, Started } from '../../core/models/game/game-states';
import { SessionService } from '../../core/services/session.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  public game : Game = {} as Game;
  public gameSubscription : Subscription;

  constructor(
    private route : ActivatedRoute,
    private gamesRepository : GamesRepositoryService,
    private router : Router,
    private sessionService : SessionService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameSubscription = this.gamesRepository.fetch(params.id)
        .subscribe(x => this.router.navigate(['game', x.id]), () => this.loadDetails(params.id));
    });
  }

  public get isLogged() : boolean {
    return this.sessionService.isLogged;
  }

  public login() : void {
    this.authService.facebookLogin();
  }

  public loadDetails(id : string) {
    this.gamesRepository.fetchDetails(id)
      .subscribe(
        x => this.game = x,
        () => setTimeout(() => this.loadDetails(id), 5000)
      );
  }

  public get isUnavailable() {
    return this.game.state == Ended || this.game.state == Started;
  }

  public goExplore() {
    this.router.navigate(['/explore']);
  }

  public goBack() {
    this.router.navigate(['/']);
  }

  public join() {
    this.route.params.subscribe(params => {
      this.gamesRepository.join(params.id)
        .subscribe(() => this.router.navigate(['game', params.id]), e => {
          if (e.error && e.error.error.code == GameAlreadyMember)
            this.router.navigate(['game', params.id]);
        });
    });
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }

}
