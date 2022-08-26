import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UserRequest } from '../shared/models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  DATA_URL = environment.DATA_URL;

  constructor(private http: HttpClient) { }

  addUser(user: UserRequest) {
    return this.http.post(`${this.DATA_URL}/users`, user);
  }

  updateUser(user: UserRequest) {
    return this.http.put(`${this.DATA_URL}/users`, user);
  }

}
