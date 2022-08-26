import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      // headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`),
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });

    return next.handle(request);
  }
}
