import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Theme } from '../../interfaces/theme.interface'
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  themeOptions = [
    { name: 'Tema claro', id: 'light' },
    { name: 'Tema escuro', id: 'dark' }
  ];
  selectedTheme: string;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.selectedTheme = "light";
  }

  changeTheme(theme: Theme) {
    this.themeService.updateTheme(theme)
    this.selectedTheme = theme.id;
    if(this.selectedTheme === 'dark') {
      document.body.style.background = '#3a3939';
    } else {
      document.body.style.background = 'white';
    }
  }

}
