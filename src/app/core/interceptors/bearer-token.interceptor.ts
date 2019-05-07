import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {

  constructor (private router : Router, private tokenService : TokenService) {}

  public intercept (req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    const token : string = this.tokenService.get();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }

}