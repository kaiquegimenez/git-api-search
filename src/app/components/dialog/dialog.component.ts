import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Person } from '../../interfaces/person.interface'
import { DialogService } from './dialog.service';
import * as moment from 'moment';


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
  constructor(
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.list = data;
  }

  ngOnInit(): void {
    console.log(this.list);
    if(this.list.owner) {
      this.urlProjects = this.list.owner.repos_url;
    } else {
      this.urlProjects = this.list.repos_url;
    }
    this.getProjects()
  }

  getProjects() {
    debugger
    this.page++;
    this.dialogService.getProjects(this.urlProjects, this.page).subscribe((res: any) => {
      console.log('Aqui', res);
      debugger
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
