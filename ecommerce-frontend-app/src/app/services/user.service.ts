import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UserRequest } from '../shared/models/interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  DATA_URL = environment.DATA_URL;
  token = this.authService.getToken();

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer ' + this.token as string
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  addUser(user: UserRequest) {
    return this.http.post(`${this.DATA_URL}/users`, user, this.httpOptions);
  }

  updateUser(user: UserRequest) {
    return this.http.put(`${this.DATA_URL}/users`, user, this.httpOptions);
  }

}
