import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { DialogsComponent } from 'src/app/components/dialogs/dialogs.component';
import { MaterialModule } from 'src/app/material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInSignUpComponent } from './sign-in-sign-up/sign-in-sign-up.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signup', component: SignInSignUpComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
    DialogsComponent,
    SignInComponent,
    SignInSignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class LoginModule { }
