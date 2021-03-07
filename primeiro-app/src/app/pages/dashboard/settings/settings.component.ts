import { Component, DoCheck, OnInit, Renderer2, RendererFactory2 } from '@angular/core'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import { Store } from '@ngrx/store'
import { DashboardComponent } from '../dashboard.component'
import * as actionsDashboard from '../../../actions/dashboard.actions'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends DashboardComponent implements OnInit, DoCheck {
  public isDark: boolean
  public isDev: boolean
  private renderer: Renderer2
  private colorTheme: string = ''
  private devMode: string = ''

  constructor(
    protected _renderedFactory: RendererFactory2,
    protected _store: Store,
    protected _snackbar: MatSnackBar
  ) {
    super()
    this.renderer = this._renderedFactory.createRenderer(null, null)
    this.init()
    this.isDark = this.isDarkMode()
    this.isDev = this.isDarkMode()
  }

  public ngOnInit(): void {
  }

  public ngDoCheck() { }

  public init(): void {
    this.getColorTheme()
    this.getMode()
    this.renderer.addClass(document.body, this.colorTheme)
  }

  public updateColorTheme(theme: 'dark-mode' | 'light-mode'): void {
    this.defineColorTheme(theme)
    const previousColorTheme = (theme === 'dark-mode' ? 'light-mode' : 'dark-mode')
    this.renderer.removeClass(document.body, previousColorTheme)
    this.renderer.addClass(document.body, theme)
  }

  private defineColorTheme(theme: string): void {
    this.colorTheme = theme
    localStorage.setItem('user-theme', theme)
  }

  private getColorTheme(): void {
    localStorage.getItem('user-theme')
      ? this.colorTheme = localStorage.getItem('user-theme') || ''
      : this.colorTheme = 'light-mode'
  }

  private getMode(): void {
    localStorage.getItem('dev-mode') ? this.devMode = localStorage.getItem('dev-mode') || '' : this.devMode = 'dev-mode'
  }

  public isDarkMode(): boolean {
    return this.colorTheme === 'dark-mode'
  }

  public isDevMode(): boolean {
    return this.devMode === 'dev-mode'
  }

  public updateMode(mode: 'dev-mode' | 'prod-mode'): void {
    this.defineMode(mode)
    const previousMode = (mode === 'dev-mode' ? 'dev-mode' : 'prod-mode')
    localStorage.removeItem(previousMode)
    localStorage.setItem('mode', mode)
  }

  public defineMode(mode: string): void {
    this.devMode = mode
    localStorage.setItem('mode', mode)
  }

  public toggleDarkMode(event: MatSlideToggleChange): void {
    this.updateColorTheme(event.checked ? 'dark-mode' : 'light-mode')
    this._store.dispatch(actionsDashboard.DARK_MODE({ payload: event.checked ? 'dark-mode' : 'light-mode' }))
  }

  public activeDevMode(event: MatSlideToggleChange): void {
    this.updateMode(event.checked ? 'dev-mode' : 'prod-mode')
    this.notification(`Dev mode está: ${event.checked ? 'ativado' : 'desativado'}`)
  }
}
