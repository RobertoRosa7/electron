import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  public token: string | null = null
  public text: string = 'E-mail não verificado!'
  public isVerified: boolean = false

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams.pipe(
      switchMap((params: any) => {
        if (params) {
          return this._loginService.loginVerified({ token: params['token'] }).pipe(catchError(e => of(e)))
        } else {
          return of(null)
        }
      })
    ).subscribe(res => {
      this.text = 'E-mail verificado!'
      this.isVerified = true
    })
  }
}
// eyJhbGciOiJIUzUxMiIsImlhdCI6MTYxNTg1NTUwNiwiZXhwIjo0MjQzODU1NTA2fQ.eyJfaWQiOiI2MDRkMTcwMTY4YTg3YWEzMWVhOWVhNDkifQ.HMal5B-fj0cbdZReHlCQroJQbJ0MQ8uZGAs_wuan5JOcurisCUqt-M-cIXk4Ty4FQOLsUQtJL4UKTSvOyR_uKQ