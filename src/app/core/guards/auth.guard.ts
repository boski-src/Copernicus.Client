import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor (private router : Router, private sessionService : SessionService) {}

  canLoad (
    next : Route,
    state : UrlSegment[]
  ) : Observable<boolean> | Promise<boolean> | boolean {
    if (this.sessionService.isLogged) return true;

    this.router.navigate(['/']);
    return false;
  }

}
