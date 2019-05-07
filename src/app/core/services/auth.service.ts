import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { SessionService } from './session.service';
import { LoginFacebookRequest } from '../requests/auth/login-facebook.request';

declare const FB : any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authRepository : AuthRepositoryService, private sessionService : SessionService) {
    FB.init({
      appId: environment.fbAppId,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.2'
    });
  }

  public facebookLogin() {
    FB.login(res => {
      if (res.authResponse) {
        const { accessToken, refreshToken } = res.authResponse;
        this.authRepository.loginViaFacebook(new LoginFacebookRequest(accessToken, refreshToken))
          .subscribe(data => this.sessionService.set(data.token));
      }
    }, { scope: 'public_profile,email' });
  }

}
