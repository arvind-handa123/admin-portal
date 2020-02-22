import { Injectable, EventEmitter } from '@angular/core';
import { Theme, yabx, airtel, eKyc } from '../theme/theme/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = airtel;
  private availableThemes: Theme[] = [airtel, yabx];
  public themeChange: EventEmitter<any> = new EventEmitter();

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isyabxTheme(): boolean {
    return this.active.name === yabx.name;
  }

  isairtelTheme(): boolean {
    return this.active.name === yabx.name;
  }

  isEKycTheme(): boolean {
    return this.active.name === yabx.name;
  }

  setyabxTheme(): void {
    this.setActiveTheme(yabx);
    this.themeChange.emit(yabx)
  }

  setairtelTheme(): void {
    this.setActiveTheme(airtel);
    this.themeChange.emit(airtel);
  }

  setEKycTheme(): void {
    this.setActiveTheme(eKyc);
    this.themeChange.emit(eKyc);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}

