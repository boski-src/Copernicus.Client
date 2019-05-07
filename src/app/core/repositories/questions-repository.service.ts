import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question/question.model';
import { PagedQueryRequest } from '../requests/paged-query.request';
import { CreateQuestionRequest } from '../requests/question/create-question.request';
import { HttpCreated } from '../models/http-created.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsRepositoryService {

  private ENDPOINT = '/questions';

  constructor (private httpClient : HttpClient) { }

  public fetchAllPaginate (request : PagedQueryRequest) : Observable<Question[]> {
    let params = { page: request.page.toString(), limit: request.limit.toString() };
    return this.httpClient.get(this.ENDPOINT, { params })
      .pipe<Question[]>(
        map<any, Question[]>(data => data.map(x => new Question(x)))
      );
  }

  public fetch (id : string) : Observable<Question> {
    return this.httpClient.get(`${this.ENDPOINT}/${id}`)
      .pipe<Question>(
        map<any, Question>(data => new Question(data))
      );
  }

  public search (keyword : string) : Observable<Question[]> {
    return this.httpClient.get(`${this.ENDPOINT}/search`, { params: { q: keyword }})
      .pipe<Question[]>(
        map<any, Question[]>(data => data.map(x => new Question(x)))
      );
  }

  public create (request : CreateQuestionRequest) : Observable<HttpCreated> {
    return this.httpClient.post(this.ENDPOINT, request)
      .pipe<HttpCreated>(
        map<any, HttpCreated>(data => new HttpCreated(data))
      );
  }

  public update (id : string, request : CreateQuestionRequest) : Observable<any> {
    return this.httpClient.put(`${this.ENDPOINT}/${id}`, request);
  }

  public delete (id : string) : Observable<any> {
    return this.httpClient.delete(`${this.ENDPOINT}/${id}`);
  }

}
