import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountRepositoryService } from '../repositories/account-repository.service';
import { Account } from '../models/account/account.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isLoggedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentAccount : Account = {} as Account;
  public isLogged$ : Observable<boolean> = this.isLoggedSubject.asObservable();

  constructor(
    private router : Router,
    private tokenService : TokenService,
    private accountRepository : AccountRepositoryService
  ) {
    if (tokenService.isExists()) this.set(tokenService.get());
  }

  public get isLogged() : boolean {
    return this.isLoggedSubject.value;
  }

  public get isAdmin () : boolean {
    return this.currentAccount.role == "admin";
  }

  public get me() : Account {
    return this.currentAccount;
  }

  public set(token : string) : void {
    this.tokenService.set(token);
    this.isLoggedSubject.next(true);
    this.loadAccount();
  }

  public destroy() : void {
    this.tokenService.remove();
    this.isLoggedSubject.next(false);
    this.currentAccount = {} as Account;
  }

  public loadAccount() : Promise<Account> {
    return new Promise((resolve) => {
      this.accountRepository.fetch()
        .subscribe(data => {
          this.currentAccount = data;
          resolve(data);
        }, e => {
          if (e.status == 401) this.destroy();
        });
    })
  }

}
