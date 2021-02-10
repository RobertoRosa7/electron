import { NgModule } from "@angular/core"
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatCardModule } from '@angular/material/card'
import { CommonModule, registerLocaleData } from "@angular/common"
import { MatIconModule } from '@angular/material/icon'
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
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import localePt from '@angular/common/locales/pt'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule, Routes } from "@angular/router"
import { MatSidenavModule } from '@angular/material/sidenav'
import { SettingsComponent } from "./settings/settings.component"
import { RegistersComponent } from "./registers/registers.component"
import { FormIncomingComponent } from "src/app/components/form-incoming/form-incoming.component"
import { GridComponent } from "src/app/components/grid/grid.component"
import { DashboardComponent } from "./dashboard.component"
import { CardsComponent } from "src/app/components/cards/cards.component";
import { MainComponent } from './main/main.component';
import { ResultSearchComponent } from './result-search/result-search.component'

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: MainComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'registers', component: RegistersComponent },
      { path: 'result-search', component: ResultSearchComponent },
    ]
  },
];

export const MY_FORMATS = {
  parse: { dateInput: 'DD MM YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

registerLocaleData(localePt, 'pt-BR')

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    RegistersComponent,
    FormIncomingComponent,
    GridComponent,
    CardsComponent,
    MainComponent,
    ResultSearchComponent
  ],
  imports: [
    RouterModule.forChild(routes),
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
    MomentDateModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  entryComponents: [
  ],
  // exports: [],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  // entryComponents: []
})
export class DashboardModule { }