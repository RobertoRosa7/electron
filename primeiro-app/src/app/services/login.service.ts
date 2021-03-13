import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/models';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private http: HttpClient,
    private constants: Constants,
  ) { }

  public signup(payload: User): Observable<User> {
    return this.http.post<User>(this.constants.get('signup'), payload)
  }
}
