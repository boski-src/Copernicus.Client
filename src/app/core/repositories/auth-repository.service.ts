import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LoginFacebookRequest } from '../requests/auth/login-facebook.request';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService {

  private ENDPOINT = '/auth';

  constructor(private httpClient : HttpClient) { }

  public loginViaFacebook(request : LoginFacebookRequest) : Observable<Auth> {
    return this.httpClient.post(this.ENDPOINT, request)
      .pipe<Auth>(
        map<any, Auth>(data => new Auth(data))
      );
  }

}
