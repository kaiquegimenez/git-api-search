import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'git-card',
  templateUrl: './git-card.component.html',
  styleUrls: ['./git-card.component.scss']
})
export class GitCardComponent implements OnInit {
  @Input() items: [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.items)
  }
  teste(){
    console.log("oi")
  }

}
