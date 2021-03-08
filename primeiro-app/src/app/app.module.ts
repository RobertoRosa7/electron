import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { NgxElectronModule } from 'ngx-electron'
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { PrimeiroAppStore } from './store/primeiroapp.store'
import { RegistersEffect } from './effects/registers.effects'
import { DashboardEffect } from './effects/dashboard.effects'
import { registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'
import { HomeComponent } from './pages/home/home.component'
import { HttpClientModule } from '@angular/common/http'
import { Constants } from './services/constants'
import { AngularCreatePdfModule } from 'angular-create-pdf'

registerLocaleData(localePt, 'pt-BR')

const indexedConfig: DBConfig = {
  name: 'PrimeiroApp',
  version: 3, // only work on this version
  objectStoresMeta: [{
    store: 'PrimeiroApp',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: []
  }],
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    NgxElectronModule,
    AppRoutingModule,
    HttpClientModule,
    AngularCreatePdfModule,
    NgxIndexedDBModule.forRoot(indexedConfig),
    StoreModule.forRoot(PrimeiroAppStore),
    StoreDevtoolsModule.instrument({ maxAge: 45 }),
    EffectsModule.forRoot([RegistersEffect, DashboardEffect])
  ],
  providers: [
    { provide: Constants },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
