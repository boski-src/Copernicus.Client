import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersRepositoryService {

  private ENDPOINT = '/players';

  constructor (private httpClient : HttpClient) { }

  public fetchAll () : Observable<Player[]> {
    return this.httpClient.get(this.ENDPOINT)
      .pipe<Player[]>(
        map<any, Player[]>(data => data.map(x => new Player(x)))
      );
  }

  public fetch (id : string) : Observable<Player> {
    return this.httpClient.get(`${this.ENDPOINT}/${id}`)
      .pipe<Player>(
        map<any, Player>(data => new Player(data))
      );
  }

}
