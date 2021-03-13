import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { DialogsComponent } from 'src/app/components/dialogs/dialogs.component';
import { MaterialModule } from 'src/app/material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginService } from 'src/app/services/login.service';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signup', component: SignUpComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
    DialogsComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  providers: [
    { provide: LoginService },
  ],
})
export class LoginModule { }
