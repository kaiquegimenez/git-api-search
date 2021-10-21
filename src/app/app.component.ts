import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  typeSearch = 'name';
  types = [
    {
      name: 'Nome',
      value: 'name'
    },
    {
      name: 'Projeto',
      value: 'project'
    },
    {
      name: 'Ambos',
      value: 'both'
    }
  ]

  constructor(private appService: AppService) {}
  ngOnInit() {}

  changeTypeSearch() {
    this.appService.updateTypeSearch(this.typeSearch)
  }
}
