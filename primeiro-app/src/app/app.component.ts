import { Component, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { IpcService } from './services/ipc.service';

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
    private _rf: RendererFactory2,
    private _el: ElectronService,
    private _ipc: IpcService
  ) {
    this.renderer = this._rf.createRenderer(null, null)
    this.initTheme()
    this.isDark = this.isDarkMode()
    this._ipc.on('pong', (event: Electron.IpcMessageEvent, message: any) => {
      console.log(message)
    })
    this._ipc.send('ping', 'teste')
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
