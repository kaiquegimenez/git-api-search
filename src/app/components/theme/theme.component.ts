import { Component, OnInit } from '@angular/core';
import { Theme } from '../../interfaces/theme.interface'

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  themeOptions = [
    { name: 'Tema escuro', id: 'dark' },
    { name: 'Tema claro', id: 'light' }
  ];
  selectedTheme: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedTheme = "light";
  }

  changeTheme(theme: Theme) {
    console.log(theme);
    // this.themeService.setTheme(theme.id);
    // this.selectedTheme = theme.id;
  }

}
