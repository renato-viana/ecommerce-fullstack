import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { UserTokenPayload } from '../models/userTokenPayload';
import { TokenResponse } from '../shared/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string;

  constructor(private router: Router) { }

  setToken(tokenResponse: TokenResponse) {
    this.token = tokenResponse.token;
    localStorage.setItem('token', this.token);
  }

  getToken(): string | null {
    if (this.token) {
      return this.token;
    }

    const token = localStorage.getItem('token');

    if (token) {
      this.token = token;
      return this.token;
    }

    return null;
  }

  public decodePayloadJWT(): UserTokenPayload | null {
    try {
      const token = this.getToken();

      if (token === null) {
        throw new Error();
      }

      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.decodePayloadJWT() !== null;
  }

  logout(): void {
    this.token = '';
    localStorage.clear();
    this.router.navigate(['login'])
  }

}


