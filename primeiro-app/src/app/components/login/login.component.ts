import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() trigger = new EventEmitter()

  public textIcon: string = 'password'
  public changeIcon: string = 'visibility_off'
  public changeTextLogin: string = 'Não tenho conta'
  public isLogin: boolean = false
  public isLoginText: string = 'login'
  public isLoading: boolean = false

  public formLogin: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    keep_connect: [false],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
  })

  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  // public checkPassword(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName]
  //     const matchingControl = formGroup.controls[matchingControlName]

  //     if (matchingControl.errors && !matchingControl.errors.mustMatch) {
  //       return
  //     }

  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ mustMatch: true })
  //       this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false
  //     } else {
  //       matchingControl.setErrors(null)
  //       this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false
  //     }
  //   }
  // }

  public onSubmit(event: any): void {
    event.preventDefault()
    this.isLoading = true
    this.trigger.emit({ operation: 'submit', data: this.formLogin.value })
  }

  public changeVisibility(str: string): void {
    this.textIcon = str == 'password' ? 'text' : 'password'
    this.changeIcon = str == 'password' ? 'visibility' : 'visibility_off'
  }

  public forgetPassword(str: string) {
  }

  public noAccount(str: string) {
    this._router.navigateByUrl('/login/signup').then()
    this.close()
  }

  public close(options?: any): void {
    this.trigger.emit({ operation: 'close', data: options })
  }
}
