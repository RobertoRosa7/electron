import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GridComponent } from '../components/grid/grid.component';
import { CardsComponent } from '../components/cards/cards.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SettingsComponent,
    GridComponent,
    CardsComponent,

  ],
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    CommonModule,
    MatIconModule
  ],
  // exports: [],
  // providers: [],
  // entryComponents: []
})
export class PageModule { }