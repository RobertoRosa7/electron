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
      link: '/',
      name: 'Home',
      icon: 'home'
    },
    {
      link: '/app',
      name: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link: '/settings',
      name: 'Settings',
      icon: 'settings'
    },
  ]

  constructor(
    private renderedFactory: RendererFactory2
  ) {
    this.renderer = this.renderedFactory.createRenderer(null, null)
    this.initTheme()
    this.isDark = this.isDarkMode()
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
