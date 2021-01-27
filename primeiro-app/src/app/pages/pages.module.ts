import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GridComponent } from '../components/grid/grid.component';
@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SettingsComponent,
    GridComponent,

  ],
  imports: [
    MatSlideToggleModule
  ],
  // exports: [],
  // providers: [],
  // entryComponents: []
})
export class PageModule { }