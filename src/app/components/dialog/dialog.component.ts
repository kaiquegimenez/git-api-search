import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  list: object
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.list = data;
  }

  ngOnInit(): void {
    console.log(this.list)
  }

}
