import { Component, DoCheck, EventEmitter, KeyValueDiffers, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { delay } from 'rxjs/operators'
import * as actionsLogin from '../../actions/login.actions'
import * as actionsErrors from '../../actions/errors.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {
  @Output() trigger = new EventEmitter()

  public textIcon: string = 'password'
  public changeIcon: string = 'visibility_off'
  public changeTextLogin: string = 'Não tenho conta'
  public isLogin: boolean = false
  public isLoginText: string = 'login'
  public isLoading: boolean = false
  public token: string = ''
  public differ: any
  public user: any

  public formLogin: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    keep_connect: [false],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
  })

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _store: Store,
    private _snackbar: MatSnackBar,
    private _diff: KeyValueDiffers,
  ) {
    this.differ = this._diff.find({}).create()
  }

  public ngOnInit(): void {
    this._store.select(({ http_error, login }: any) => ({ errors: http_error.errors, user: login.user }))
      .pipe(delay(3000))
      .subscribe(state => {
        this.user = state.user
        if (state.errors.length > 0) {
          state.errors.forEach((e: any) => {
            const msg = e.error['message'] ? e.error.message : e.error
            this._snackbar.open(msg, 'ok')
            this.isLoading = false
            this._store.dispatch(actionsErrors.RESET_ERRORS())
          })
        }
      })
  }

  public ngDoCheck() {
    const change = this.differ.diff(this)
    if (change) {
      change.forEachChangedItem((item: any) => {
        if (item.key === 'user') {
          this.isLoading = false
        }
      })
    }
  }
  
  public onSubmit(event: any): void {
    event.preventDefault()
    this.isLoading = true
    this.trigger.emit({ operation: 'show-progressbar', data: {} })
    this._store.dispatch(actionsLogin.SIGNIN({ payload: this.formLogin.value }))
  }

  public changeVisibility(str: string): void {
    this.textIcon = str == 'password' ? 'text' : 'password'
    this.changeIcon = str == 'password' ? 'visibility' : 'visibility_off'
  }

  public forgetPassword(event: any) {
    if (this.isLoading) {
      event.preventDefault()
    } else {
      this._router.navigateByUrl('/login/reset').then()
      this.close()
    }
  }

  public noAccount(event: any) {
    if (this.isLoading) {
      event.preventDefault()
    } else {
      this._router.navigateByUrl('/login/signup').then()
      this.close()
    }
  }

  public close(options?: any): void {
    this.trigger.emit({ operation: 'close', data: options })
  }
}
