import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BearerTokenInterceptor } from './interceptors/bearer-token.interceptor';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { TokenService } from './services/token.service';
import { SessionService } from './services/session.service';
import { AuthService } from './services/auth.service';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left'
        },
        vertical: {
          position: 'bottom'
        },
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerTokenInterceptor,
      multi: true
    },
    TokenService,
    AuthService,
    SessionService
  ]
})
export class CoreModule { }
