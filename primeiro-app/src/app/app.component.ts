import { Component, Renderer2, RendererFactory2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isDark: boolean
  private renderer: Renderer2
  private colorTheme: string = ''
  public menuList: any[] = [
    {
      link: '/app',
      name: 'Home',
      icon: 'home'
    },
    {
      link: '/',
      name: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link: '/',
      name: 'Settings',
      icon: 'settings'
    },
  ]

  constructor(
    private renderedFactory: RendererFactory2
  ) {
    this.renderer = renderedFactory.createRenderer(null, null)
    this.initTheme()
    this.isDark = this.isDarkMode()
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
  }
}
