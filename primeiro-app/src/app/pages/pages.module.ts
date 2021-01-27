import { NgModule } from "@angular/core"
import { HomeComponent } from "./home/home.component"
import { DashboardComponent } from './dashboard/dashboard.component'
import { SettingsComponent } from './settings/settings.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { GridComponent } from '../components/grid/grid.component'
import { CardsComponent } from '../components/cards/cards.component'
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from "@angular/common"
import { MatIconModule } from '@angular/material/icon'
import { RegistersComponent } from '../pages/registers/registers.component'
import { FormIncomingComponent } from '../components/form-incoming/form-incoming.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SettingsComponent,
    GridComponent,
    CardsComponent,
    RegistersComponent,
    FormIncomingComponent,
  ],
  imports: [
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CurrencyMaskModule
  ],
  // exports: [],
  // providers: [],
  // entryComponents: []
})
export class PageModule { }