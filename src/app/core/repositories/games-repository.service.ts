import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { PagedQueryRequest } from '../requests/paged-query.request';
import { Game } from '../models/game/game.model';
import { HttpCreated } from '../models/http-created.model';
import { CreateGameRequest } from '../requests/game/create-game.request';
import { FetchByCodeRequest } from '../requests/game/fetch-by-code.request';
import { CreateAnswerRequest } from '../requests/game/create-answer.request';

@Injectable({
  providedIn: 'root'
})
export class GamesRepositoryService {

  private ENDPOINT = '/games';

  constructor(private httpClient : HttpClient) { }

  public fetchAllPaginate(request : PagedQueryRequest) : Observable<Game[]> {
    let params = { page: request.page.toString(), limit: request.limit.toString() };
    return this.httpClient.get(this.ENDPOINT, { params })
      .pipe<Game[]>(
        map<any, Game[]>(data => data.map(x => new Game(x)))
      );
  }

  public fetch(id : string) : Observable<Game> {
    return this.httpClient.get(`${this.ENDPOINT}/${id}`)
      .pipe<Game>(
        map<any, Game>(data => new Game(data))
      );
  }

  public fetchDetails(id : string) : Observable<Game> {
    return this.httpClient.get(`${this.ENDPOINT}/${id}/details`)
      .pipe<Game>(
        map<any, Game>(data => new Game(data))
      );
  }

  public fetchDetailsByCode(request : FetchByCodeRequest) : Observable<Game> {
    return this.httpClient.post(`${this.ENDPOINT}/code`, request)
      .pipe<Game>(
        map<any, Game>(data => new Game(data))
      );
  }

  public create(request : CreateGameRequest) : Observable<HttpCreated> {
    return this.httpClient.post(this.ENDPOINT, request)
      .pipe<HttpCreated>(
        map<any, HttpCreated>(data => new HttpCreated(data))
      );
  }

  public join(id : string) : Observable<any> {
    return this.httpClient.post(`${this.ENDPOINT}/${id}/join`, {});
  }

  public leave(id : string) : Observable<any> {
    return this.httpClient.post(`${this.ENDPOINT}/${id}/leave`, {});
  }

  public start(id : string) : Observable<any> {
    return this.httpClient.post(`${this.ENDPOINT}/${id}/start`, {});
  }

  public end(id : string) : Observable<any> {
    return this.httpClient.post(`${this.ENDPOINT}/${id}/end`, {});
  }

  public nextQuestion(id : string) : Observable<any> {
    return this.httpClient.post(`${this.ENDPOINT}/${id}/change-question`, {});
  }

  public answerQuestion(id : string, request : CreateAnswerRequest) : Observable<any> {
    return this.httpClient.post(`${this.ENDPOINT}/${id}/answer-question`, request);
  }

}
