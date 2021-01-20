import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // private storedTheme: string | null = localStorage.getItem('switch-theme')
  private isDark: boolean = false

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light'
  }
  // public switchTheme() {
  //   if (this.storedTheme === 'theme-dark') {
  //     // toggle update local storage
  //     localStorage.setItem('switch-theme', 'theme-light')
  //     this.storedTheme = localStorage.getItem('switch-theme')
  //   } else {
  //     // toggle update local storage
  //     localStorage.setItem('switch-theme', 'theme-light')
  //     this.storedTheme = localStorage.getItem('switch-theme')
  //   }
  // }
}
