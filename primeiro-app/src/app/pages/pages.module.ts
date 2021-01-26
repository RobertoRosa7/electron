import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SettingsComponent,

  ],
  imports: [
    MatSlideToggleModule
  ],
  // exports: [],
  // providers: [],
  // entryComponents: []
})
export class PageModule { }