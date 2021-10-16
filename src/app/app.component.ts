import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './app.service'
import { SearchbarService } from '../app/components/searchbar/searchbar.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'git-search';
  query$: Observable<string>;
  querySubscription: Subscription;
  typeSearch = 'name';
  resultList = [];

  constructor(
    private appService: AppService,
    private searchbarService: SearchbarService
  ) {}
  ngOnInit() {
    this.query$ = this.searchbarService.getQuery();
    this.querySubscription = this.query$.subscribe((value) => {
      if (value != null) {
        if (value == undefined) value = '';
        this.resultList = []
        if(this.typeSearch === 'name') {
          this.getUsers(value);
        } else if(this.typeSearch === 'project') {
          this.getProject(value);
        } else {
          this.getProject(value);
          this.getUsers(value);
        }
      }
    });
  }

  async getUsers(userName) {
    if(userName === "") return
    await this.appService.getUsers(userName).subscribe((res: any) => {
      res.items.forEach(item => {
        this.appService.getInfoUsers(item.url).subscribe((res: any) => {
          this.resultList = this.resultList.concat(res);
        }, err => {
          console.log(err);
        })
      });
    }, err => {
      console.log(err);
    })
  }

  getProject(projectName) {
    if(projectName === "") return
    this.appService.getProject(projectName).subscribe((res: any) => {
      this.resultList = this.resultList.concat(res.items);
      console.log(this.resultList);
    }, err => {
      console.log(err);
    })
  }
}
