import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';
import { TokenResponse } from '../shared/tokenResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  DATA_URL = environment.DATA_URL;

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(user: User): Observable<TokenResponse> {
    return this.http.post(`${this.DATA_URL}/users/authenticate`, user).pipe(
      tap((token: any) => this.authService.setToken(token))
    );
  }

}
