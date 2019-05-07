import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '../services/session.service';
import { Admin } from '../models/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router : Router, private sessionService : SessionService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    const account = await this.sessionService.loadAccount();

    console.log(account);

    if (account.role == Admin) return true;

    this.router.navigate(['/']);
    return false;
  }

}
