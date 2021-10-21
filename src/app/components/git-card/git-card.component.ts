import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme.interface';
import { DialogComponent } from '../dialog/dialog.component';
import { ThemeService } from '../theme/theme.service';
import { Person } from '../../interfaces/person.interface'
import { SearchbarService } from '../searchbar/searchbar.service';
import { GitCardService } from './git-card.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'git-card',
  templateUrl: './git-card.component.html',
  styleUrls: ['./git-card.component.scss']
})
export class GitCardComponent implements OnInit {
  @Input() items: Person[];

  query$: Observable<string>;
  querySubscription: Subscription;
  theme$: Observable<Theme>;
  themeSubscription: Subscription;
  typeSearch$: Observable<string>;
  typeSearchSubscription: Subscription;
  query: string;
  selectedTheme: string;
  typeSearch = 'name';
  resultList = [];
  page = 1;

  constructor(
    private matDialog: MatDialog,
    private themeService: ThemeService,
    private gitCardService: GitCardService,
    private searchbarService: SearchbarService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.query$ = this.searchbarService.getQuery();
    this.querySubscription = this.query$.subscribe((value) => {
      if (value != null) {
        if (value == undefined) value = '';
        this.query = value;
        this.page = 1;
        this.resultList = []
        if(this.typeSearch === 'name') {
          this.getUsers(value, this.page);
        } else if(this.typeSearch === 'project') {
          this.getProject(value, this.page);
        } else {
          this.getProject(value, this.page);
          this.getUsers(value, this.page);
        }
      }
    });
    this.theme$ = this.themeService.getTheme();
    this.themeSubscription = this.theme$.subscribe((value) => {
      if (value != null) {
        this.selectedTheme = value.id;
      }
    })
    this.typeSearch$ = this.appService.getTypeSearch();
    this.typeSearchSubscription = this.typeSearch$.subscribe((value) => {
      if (value != null) {
        this.typeSearch = value;
      }
    })
  }

  getUsers(userName: string ,page: number) {
    if(userName === "") return
    this.gitCardService.getUsers(userName, page).subscribe((res: Person) => {
      this.resultList = this.resultList.concat(res.items);
      this.resultList.forEach((item, index) => {
        this.getFollowers(item, index);
        this.getLanguages(item, index);
      });
    }, err => {
      console.log(err);
    })
  }

  getFollowers(item, index: number) {
    this.gitCardService.getFallowers(item.followers_url).subscribe((res: any) => {
      const fallowers = {'fallowers': res.length}
      Object.assign(this.resultList[index], fallowers);
    }, err => {
      console.log(err);
    })
  }

  getLanguages(item, index: number) {
    this.gitCardService.getFallowers(item.repos_url).subscribe((res: any) => {
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

  getProject(projectName: string, page: number) {
    if(projectName === "") return
    this.gitCardService.getProject(projectName, page).subscribe((res: Person) => {
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

  openDialog(item) {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: item,
      width: '90vw',
    });
  }

  onScroll() {
    this.page++;
    if(this.typeSearch === 'name') {
      this.getUsers(this.query, this.page);
    } else if(this.typeSearch === 'project') {
      this.getProject(this.query, this.page);
    } else {
      this.getProject(this.query, this.page);
      this.getUsers(this.query, this.page);
    }
  }
}
