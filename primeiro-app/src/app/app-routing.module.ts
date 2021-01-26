import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'app', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
