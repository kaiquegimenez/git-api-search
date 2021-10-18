import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './app.service'
import { SearchbarService } from '../app/components/searchbar/searchbar.service'
import { Theme } from './interfaces/theme.interface';
import { ThemeService } from './components/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'git-search';
  query$: Observable<string>;
  querySubscription: Subscription;
  theme$: Observable<Theme>;
  themeSubscription: Subscription;
  selectedTheme: string;
  typeSearch = 'name';
  resultList = [];

  constructor(
    private appService: AppService,
    private searchbarService: SearchbarService,
    private themeService: ThemeService
  ) {
  }
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
    this.theme$ = this.themeService.getTheme();
    this.themeSubscription = this.theme$.subscribe((value) => {
      if (value != null) {
        this.selectedTheme = value.id;
      }
    });
  }

  getUsers(userName) {
    if(userName === "") return
    this.appService.getUsers(userName).subscribe((res: any) => {
      this.resultList = this.resultList.concat(res.items);
      this.resultList.forEach((item, index) => {
        this.getFollowers(item, index);
        this.getLanguages(item, index);
      });
    }, err => {
      console.log(err);
    })
  }

  getFollowers(item, index) {
    this.appService.getFallowers(item.followers_url).subscribe((res: any) => {
      const fallowers = {'fallowers': res.length}
      Object.assign(this.resultList[index], fallowers);
    }, err => {
      console.log(err);
    })
  }

  getLanguages(item, index) {
    this.appService.getFallowers(item.repos_url).subscribe((res: any) => {
      let languages = []
      res.forEach(repos => {
        if(repos.language) {
          languages.push(repos.language);
        }
      });
      languages = [...new Set(languages)];
      Object.assign(this.resultList[index], {'language': languages.toString()});
    }, err => {
      console.log(err);
    })
  }

  getProject(projectName) {
    if(projectName === "") return
    this.appService.getProject(projectName).subscribe((res: any) => {
      this.resultList = this.resultList.concat(res.items);
      this.resultList.forEach((item, index) => {
        if(item.owner) {
          this.getFollowers(item.owner, index)
        }
      });
    }, err => {
      console.log(err);
    })
  }
}
