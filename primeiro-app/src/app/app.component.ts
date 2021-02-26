import { Component, Renderer2, RendererFactory2 } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsDashboard from './actions/dashboard.actions'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public isDark: boolean
  private renderer: Renderer2
  private colorTheme: string = ''

  constructor(
    private _rendereFactory: RendererFactory2,
    private _store: Store
  ) {
    this.renderer = this._rendereFactory.createRenderer(null, null)
    this.initTheme()
    this.isDark = this.isDarkMode()
    this._store.dispatch(actionsDashboard.DARK_MODE({ payload: this.colorTheme }))
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
