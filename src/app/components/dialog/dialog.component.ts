import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Person } from '../../interfaces/person.interface'
import { DialogService } from './dialog.service';
import * as moment from 'moment';
import { Theme } from 'src/app/interfaces/theme.interface';
import { Observable, Subscription } from 'rxjs';
import { ThemeService } from '../theme/theme.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  list: Person;
  repos = [];
  page = 0;
  urlProjects = '';
  theme$: Observable<Theme>;
  themeSubscription: Subscription;
  selectedTheme: string;
  
  constructor(
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private themeService: ThemeService,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.list = data;
  }

  ngOnInit(): void {
    this.theme$ = this.themeService.getTheme();
    this.themeSubscription = this.theme$.subscribe((value) => {
      if (value != null) {
        this.selectedTheme = value.id;
        if(this.selectedTheme === 'dark') {
          document.activeElement['style'].background = '#3A3939';
        } else {
          document.activeElement['style'].background = 'white';
        }
      }
    })
    if(this.list.owner) {
      this.urlProjects = this.list.owner.repos_url;
    } else {
      this.urlProjects = this.list.repos_url;
    }
    this.getProjects()
  }

  getProjects() {
    this.page++;
    this.dialogService.getProjects(this.urlProjects, this.page).subscribe((res: any) => {
      console.log('Aqui', res);
      if(this.page === 1) {
        this.repos = res;
      } else {
        this.repos = this.repos.concat(res);
      }
    }, err => {
      console.log(err);
    })
  }

  convertData(data){
    return moment(data).format('DD/MM/YYYY')
  }

  openProject(repo) {
    window.open(repo.html_url, '_blank')
  }

  onScroll() {
    this.getProjects()
  }

}
