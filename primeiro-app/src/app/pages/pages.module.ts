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
import { CurrencyMaskModule } from "ng2-currency-mask"
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter'

export const MY_FORMATS = {
  parse: { dateInput: 'DD MM YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

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
    CurrencyMaskModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  // exports: [],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  // entryComponents: []
})
export class PageModule { }