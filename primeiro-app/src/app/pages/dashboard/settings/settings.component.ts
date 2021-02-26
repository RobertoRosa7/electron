import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import { Store } from '@ngrx/store'
import { DashboardComponent } from '../dashboard.component'
import * as actionsDashboard from '../../../actions/dashboard.actions'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends DashboardComponent implements OnInit {
  public isDark: boolean
  private renderer: Renderer2
  private colorTheme: string = ''

  constructor(
    protected renderedFactory: RendererFactory2,
    protected _store: Store
  ) {
    super()
    this.renderer = this.renderedFactory.createRenderer(null, null)
    this.initTheme()
    this.isDark = this.isDarkMode()
  }

  public ngOnInit(): void {
  }

  // init theme
  public initTheme(): void {
    this.getColorTheme()
    this.renderer.addClass(document.body, this.colorTheme)
  }

  // update theme
  public updateColorTheme(theme: 'dark-mode' | 'light-mode'): void {
    this.defineColorTheme(theme)
    const previousColorTheme = (theme === 'dark-mode' ? 'light-mode' : 'dark-mode')
    this.renderer.removeClass(document.body, previousColorTheme)
    this.renderer.addClass(document.body, theme)
  }

  // define color
  private defineColorTheme(theme: string): void {
    this.colorTheme = theme
    localStorage.setItem('user-theme', theme)
  }

  // get color
  private getColorTheme(): void {
    if (localStorage.getItem('user-theme')) {
      this.colorTheme = localStorage.getItem('user-theme') || ''
    } else {
      this.colorTheme = 'light-mode'
    }
  }

  // is dark or light
  public isDarkMode(): boolean {
    return this.colorTheme === 'dark-mode'
  }

  // alterna entre light and dark mode
  public toggleDarkMode(event: MatSlideToggleChange) {
    this.updateColorTheme(event.checked ? 'dark-mode' : 'light-mode')
    this._store.dispatch(actionsDashboard.DARK_MODE({ payload: event.checked ? 'dark-mode' : 'light-mode' }))
  }
}
