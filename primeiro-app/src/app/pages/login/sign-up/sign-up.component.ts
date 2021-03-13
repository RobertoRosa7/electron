import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public textIcon: string = 'password'
  public changeIcon: string = 'visibility_off'
  public changeTextLogin: string = 'Não tenho conta'
  public isLogin: boolean = false
  public isLoginText: string = 'login'
  public isLoading: boolean = false
  public isPasswordSame: boolean = false

  public formSignup: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    keep_connect: [false],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
  }, { validator: this.checkPassword('password', 'confirm_password') })

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
        this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false
      } else {
        matchingControl.setErrors(null)
        this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false
      }
    }
  }

  public onSubmit(event: any): void {
    event.preventDefault()
    this.isLoading = true
    console.log(this.formSignup.value)
  }

  public changeVisibility(str: string): void {
    this.textIcon = str == 'password' ? 'text' : 'password'
    this.changeIcon = str == 'password' ? 'visibility' : 'visibility_off'
  }

  public forgetPassword(str: string) {
  }

  public noAccount(str: string) {
    this.close()
  }

  public close(options?: any): void {
  }

}
