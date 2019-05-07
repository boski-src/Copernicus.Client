import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../models/account/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountRepositoryService {

  private ENDPOINT = '/account';

  constructor(private httpClient : HttpClient) { }

  public fetch() : Observable<Account> {
    return this.httpClient.get(this.ENDPOINT)
      .pipe<Account>(
        map<any, Account>(data => new Account(data))
      );
  }

}
