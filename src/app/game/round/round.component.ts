import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GamesRepositoryService } from '../../core/repositories/games-repository.service';
import { Game } from '../../core/models/game/game.model';
import { GameNotMember } from '../../core/models/error-codes';
import { Ended, Started, Waiting } from '../../core/models/game/game-states';
import { SessionService } from '../../core/services/session.service';
import { Account } from '../../core/models/account/account.model';
import { Member } from '../../core/models/game/member.model';
import { GameSignalRService } from '../game-signalr.service';
import { Answer } from 'src/app/core/models/game/answer.model';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit, OnDestroy {

  public game : Game = {} as Game;
  public gameSubscription : Subscription;

  constructor(
    private route : ActivatedRoute,
    private gamesRepository : GamesRepositoryService,
    public router : Router,
    private session : SessionService,
    private gameSignalR : GameSignalRService
  ) { }

  public get me() : Account {
    return this.session.me;
  }

  public get isConnected(): boolean {
    return this.gameSignalR.isConnectedToGame;
  }

  public get isWaiting() : boolean {
    return this.game.state == Waiting;
  }

  public get isEnded() : boolean {
    return this.game.state == Ended;
  }

  public get isStarted() : boolean {
    return this.game.state == Started;
  }

  public get gameOwner() : Member {
    return this.game.members.find(x => x.isCreator == true);
  }

  public get isOwner() : boolean {
    return this.gameOwner.userId == this.me.id;
  }

  public leave() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.gameSignalR.leaveFromGame(this.game.id);
  }

  public load() : void {
    this.route.params.subscribe(params => {
      this.gameSubscription = this.gamesRepository.fetch(params.id)
        .subscribe((x) => this.onSuccess(x), e => {
          if (e.error && e.error.error.code == GameNotMember)
            this.router.navigate(['/game', this.route.snapshot.params.id, 'join']);
          else
            this.router.navigate(['/']);
        });
    });
  }

  public registerOnGameStarted() : void {
    this.gameSignalR.hub.on('GameStarted', () => this.game.state = Started);
  }

  public registerOnGameEnded() : void {
    this.gameSignalR.hub.on('GameEnded', () => this.game.state = Ended);
  }

  public registerOnLoaderboardCalculated() : void {
    this.gameSignalR.hub.on('LoaderboardCalculated', () => {
      this.game.state = Ended;
    });
  }

  public registerOnMemberJoined() : void {
    this.gameSignalR.hub.on('MemberJoined', member => {
      const { userId, userName, userAvatarUrl } = member;
      this.game.members.push(new Member({ userId, userName, userAvatarUrl }))
    });
  }

  public registerOnMemberLeft() : void {
    this.gameSignalR.hub.on('MemberLeft', member => {
      let index = this.game.members.findIndex(x => x.userId == member.userId);
      this.game.members.splice(index, 1);
    });
  }

  public onSuccess(game : Game) {
    this.game = game;
    this.gameSignalR.joinToGame(this.game.id);
    this.registerOnGameStarted();
    this.registerOnGameEnded();
    this.registerOnMemberJoined();
    this.registerOnMemberLeft();
  }

  public onQuestionChanged(questionId : string) {
    this.game.currentQuestionId = questionId;
  }

  public onAnswerCreated(answer : Answer) {
    this.game.answers.push(answer);
  }

}
