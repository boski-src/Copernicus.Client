import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../core/models/game/game.model';
import { Router } from '@angular/router';
import { Winner } from 'src/app/core/models/game/winner.model';
import { GamesRepositoryService } from 'src/app/core/repositories/games-repository.service';
import { Member } from 'src/app/core/models/game/member.model';

@Component({
  selector: 'app-ended-scene',
  templateUrl: './ended-scene.component.html',
  styleUrls: ['./ended-scene.component.scss']
})
export class EndedSceneComponent implements OnInit {

  @Input() public game : Game;
  @Input() public isOwner : boolean;

  public winners: Winner[];
  public loading : boolean = true;

  constructor(private router: Router, private gamesRepository: GamesRepositoryService) { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.gamesRepository.fetch(this.game.id)
        .subscribe(
          x => {
            this.winners = x.winners;
            this.loading = false;
          },
          () => setTimeout(() => this.ngOnInit(), 4000)
        );
    }, 1000)
  }

  public get bestWinner() : Member {
    return this.game.members.find(x => x.userId == this.winners[0].userId);
  }

  public goBack() {
    this.router.navigate(['/']);
  }

}
