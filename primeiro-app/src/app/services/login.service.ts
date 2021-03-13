import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public signin(payload: any): Observable<any> {
    return this.http.post<any>(this.constants.get('signin'), payload)
  }
}