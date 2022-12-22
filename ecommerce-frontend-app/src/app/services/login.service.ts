import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { UserRequest } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  DATA_URL = environment.DATA_URL;

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(user: UserRequest): Observable<any> {
    // const form = new FormData;

    // form.append('username', user.email);
    // form.append('password', user.password);

    return this.http.post(`${this.DATA_URL}/users/authenticate`, user).pipe(
      tap((token: any) => this.authService.setToken(token))
    );
  }

}
