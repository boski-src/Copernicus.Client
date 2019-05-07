import { Component, OnInit } from '@angular/core';
import { PlayersRepositoryService } from '../../core/repositories/players-repository.service';
import { Player } from '../../core/models/player.model';

@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit {

  public players : Player[];

  constructor(private playersReposiotory : PlayersRepositoryService) { }

  ngOnInit() {
    this.playersReposiotory.fetchAll()
      .subscribe(
        x => this.players = x,
        () => setTimeout(() => this.ngOnInit(), 5000)
      );
  }

}
