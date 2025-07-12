import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app_theme';
  currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.currentTheme = 'dark';
    }
    this.applyTheme();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }
}
