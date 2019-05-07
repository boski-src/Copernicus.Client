import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  public intercept (req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    req = req.clone({
      url: ApiUrlInterceptor.trimPath(environment.apiUrl) + req.url
    });

    return next.handle(req);
  }

  private static trimPath (str : string) : string {
    return str[str.length - 1] === '/' ? str.slice(0, str.length - 1) : str;
  }

}