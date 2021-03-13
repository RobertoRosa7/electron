import { Component, Renderer2, RendererFactory2 } from '@angular/core'
import { Store } from '@ngrx/store'
import * as actionsDashboard from './actions/dashboard.actions'
import * as actionsApp from './actions/app.actions'
import { ScrollService } from './services/scroll.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public isDark: boolean
  private renderer: Renderer2
  private colorTheme: string = ''
  public isOnline: boolean = false

  constructor(
    private _rendereFactory: RendererFactory2,
    private _store: Store,
  ) {
    this._store.dispatch(actionsApp.ONLINE())
    this.renderer = this._rendereFactory.createRenderer(null, null)
    this.initTheme()
    this.isDark = this.isDarkMode()
    this._store.dispatch(actionsDashboard.DARK_MODE({ payload: this.colorTheme }))

    this._store.select(({ http_error, app }: any) => ({ errors: http_error.errors, online: app.online }))
      .subscribe(state => {
        if (state.errors.length > 0) state.errors.forEach((e: any) => console.error(e))
        if (state.errors.length == 0 && state.online) this.isOnline = state.online
      })
  }

  // init theme
  public initTheme(): void {
    if (localStorage.getItem('user-theme')) {
      this.colorTheme = localStorage.getItem('user-theme') || ''
    } else {
      this.colorTheme = 'light-mode'
    }
    this.renderer.addClass(document.body, this.colorTheme)
  }

  // is dark or light
  public isDarkMode(): boolean {
    return this.colorTheme === 'dark-mode'
  }
}
