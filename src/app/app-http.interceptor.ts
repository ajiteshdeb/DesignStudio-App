import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment';
import { BlogService } from './services/blog.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private blogService: BlogService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const auth = this.injector.get(AuthService);
    const authRequest = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${this.authService.getToken()}`
    //   },
      url: `${environment.origin}/${request.url}`
    });

    return next.handle(authRequest)
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 0) {
            console.log('Check Your Internet Connection And Try again Later');
          } else if (err instanceof HttpErrorResponse && err.status === 401) {
            // auth.setToken(null);
            // this.router.navigate(['/', 'login']);
          }

          return throwError(err.error);
        })
      );
  }
}
