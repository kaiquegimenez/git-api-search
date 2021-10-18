import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../interfaces/theme.interface'

@Injectable({ providedIn: 'root' })
export class ThemeService {
    showSearchbar = false;
    theme = new BehaviorSubject<Theme>(null);

    getTheme() {
        return this.theme.asObservable();
    }

    updateTheme(theme: Theme) {
        this.theme.next(theme)
    }
}