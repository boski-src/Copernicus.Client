import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../core/models/game/game.model';
import { GamesRepositoryService } from '../../../core/repositories/games-repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting-scene',
  templateUrl: './waiting-scene.component.html',
  styleUrls: ['./waiting-scene.component.scss']
})
export class WaitingSceneComponent implements OnInit {

  @Input() public game : Game;
  @Input() public isOwner : boolean;

  constructor(private gamesRepository : GamesRepositoryService, private router : Router) { }

  public start() {
    this.gamesRepository.start(this.game.id)
      .subscribe();
  }

  public end() {
    this.gamesRepository.end(this.game.id)
      .subscribe();
  }

  public leave() {
    this.gamesRepository.leave(this.game.id)
      .subscribe(() => this.router.navigate(['']));
  }

  ngOnInit() {
  }

}
