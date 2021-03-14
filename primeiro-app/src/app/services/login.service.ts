import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/models';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private user$: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  private loggedIn$: BehaviorSubject<any> = new BehaviorSubject<any>(false)

  constructor(
    private http: HttpClient,
    private constants: Constants,
  ) { }

  public signup(payload: User): Observable<User> {
    return this.http.post<User>(this.constants.get('signup'), payload)
  }

  public signin(payload: any): Observable<any> {
    const authorization = { 'Authorization': `${btoa(payload.email)}:${btoa(payload.password)}` }
    return this.http.get<any>(this.constants.get('signin'), { headers: authorization }).pipe(
      tap((user: any) => {
        if (user) {
          if (payload.keep_connect) {
            localStorage.setItem('token', user.access_token)
            this.loggedIn$.next(true)
            this.user$.next(user)
          } else {
            sessionStorage.setItem('token', user.access_token)
            this.loggedIn$.next(true)
            this.user$.next(user)
          }
        }
      })
    )
  }

  public fetchToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')
    } else if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token')
    } else {
      return null
    }
  }

  public isAuthenticated(): Observable<boolean> {
    if (this.fetchToken()) this.loggedIn$.next(true)
    return this.loggedIn$.asObservable()
  }
}
