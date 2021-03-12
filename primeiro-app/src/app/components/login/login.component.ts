import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


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
  public isLogin: boolean = true
  public isLoginText: string = 'login'

  public formLogin: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    keep_connect: [false],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
  })

  constructor(
    private _fb: FormBuilder
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
    console.log(this.formLogin.value)
  }

  public changeVisibility(str: string): void {
    this.textIcon = str == 'password' ? 'text' : 'password'
    this.changeIcon = str == 'password' ? 'visibility' : 'visibility_off'
  }

  public forgetPassword(str: string) {
    // this.isLoginText = 'Enviar'
    // this.changeTextLogin = 'login'
    // this.isForget = true
    // this.isLogin = true
  }

  public noAccount(str: string) {
    // if (str === 'login') {
    //   this.isLogin = true
    //   this.isForget = false
    //   this.changeTextLogin = 'Não tenho conta'
    //   this.isLoginText = 'login'
    //   this.formLogin.get('confirm_password')?.clearValidators()
    //   this.formLogin.get('confirm_password')?.updateValueAndValidity()
    // } else {
    //   this.isLogin = false
    //   this.isForget = false
    //   this.changeTextLogin = 'login'
    //   this.isLoginText = 'cadastrar'
    // }
  }

  public close(options?: any): void {
    this.trigger.emit(options)
  }
}
