import { LOCALE_ID, NgModule } from "@angular/core"
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
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter'
import localePt from '@angular/common/locales/pt'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule, Routes } from "@angular/router"
import { MatSidenavModule } from '@angular/material/sidenav'
import { SettingsComponent } from "./settings/settings.component"
import { RegistersComponent } from "./registers/registers.component"
import { FormIncomingComponent } from "src/app/components/form-incoming/form-incoming.component"
import { GridComponent } from "src/app/components/grid/grid.component"
import { DashboardComponent } from "./dashboard.component"
import { CardsComponent } from "src/app/components/cards/cards.component"
import { MainComponent } from './main/main.component'
import { ResultSearchComponent } from './result-search/result-search.component'
import { DialogFormIncomingComponent } from "src/app/components/dialog-form-incoming/dialog-form-incoming.component"
import { HttpClientModule } from "@angular/common/http"
import { TitleComponent } from "src/app/components/title/title.component"
import { TabsComponent } from '../../components/tabs/tabs.component'
import { TabMenuComponent } from '../../components/tabs/tab-menu/tab-menu.component'
import { TabContentComponent } from '../../components/tabs/tab-content/tab-content.component'
import { TabHeaderComponent } from '../../components/tabs/tab-header/tab-header.component'
import { DialogConfirmComponent } from "src/app/components/dialog-confirm/dialog-confirm.component"
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { ListRegistersComponent } from '../../components/list-registers/list-registers.component'
import { MatSelectModule } from '@angular/material/select'
import { HighchartsComponent } from '../../components/highcharts/highcharts.component';
import { DialogsComponent } from '../../components/dialogs/dialogs.component';
import { PanelControlComponent } from '../../components/panel-control/panel-control.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: MainComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'registers', component: RegistersComponent },
      { path: 'result-search', component: ResultSearchComponent },
    ]
  },
]

export const MY_FORMATS = {
  parse: { dateInput: 'DD MM YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

registerLocaleData(localePt, 'pt')

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    RegistersComponent,
    FormIncomingComponent,
    GridComponent,
    CardsComponent,
    MainComponent,
    ResultSearchComponent,
    DialogFormIncomingComponent,
    TitleComponent,
    TabsComponent,
    TabMenuComponent,
    TabContentComponent,
    TabHeaderComponent,
    DialogConfirmComponent,
    ListRegistersComponent,
    HighchartsComponent,
    DialogsComponent,
    PanelControlComponent,
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
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    DialogFormIncomingComponent,
    DialogConfirmComponent,
    DialogsComponent
  ],
  // exports: [],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  // entryComponents: []
})
export class DashboardModule { }