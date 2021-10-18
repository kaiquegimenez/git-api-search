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
  constructor(
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.list = data;
  }

  ngOnInit(): void {
    console.log(this.list);
    let urlProjects = ""
    if(this.list.owner) {
      urlProjects = this.list.owner.repos_url;
    } else {
      urlProjects = this.list.repos_url;
    }
    this.dialogService.getProjects(urlProjects).subscribe((res: any) => {
      console.log('Aqui', res);
      this.repos = res;
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

}
