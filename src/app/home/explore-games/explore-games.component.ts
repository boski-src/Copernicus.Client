import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game/game.model';
import { GamesRepositoryService } from 'src/app/core/repositories/games-repository.service';
import { PagedQueryRequest } from 'src/app/core/requests/paged-query.request';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-explore-games',
  templateUrl: './explore-games.component.html',
  styleUrls: ['./explore-games.component.scss']
})
export class ExploreGamesComponent implements OnInit {

  public games : Game[];

  public page : number = 1;
  public loading : boolean = false;

  constructor(private sessionService: SessionService, private gamesRepository : GamesRepositoryService, private router : Router) { }

  public get isLogged(): boolean {
    return this.sessionService.isLogged;
  }

  ngOnInit() {
    this.load();
  }

  public load() : void {
    this.loading = true;
    this.gamesRepository.fetchAllPaginate(new PagedQueryRequest(this.page, 10))
      .subscribe(x => {
        if (!this.games) this.games = [];
        if (x.length > 0) {
          this.page++;
          this.games.push(...x);
        }
        this.loading = false;
      }, () => setTimeout(() => this.load(), 5000));
  }

  public redirectToGame(id : string) {
    this.router.navigate(['/game', id, 'join']);
  }

}
