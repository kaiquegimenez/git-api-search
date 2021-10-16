import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags = [];
  newTag = "";
  constructor() { }

  ngOnInit(): void {
  }

  deleteTag(index) {
    this.tags.splice(index, 1)
    console.log(this.tags);
  }

  createNewTag() {
    this.tags.push(this.newTag);
    this.newTag = "";
  }
}
