import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags = [];
  newTag = "";
  theme$: Observable<Theme>;
  themeSubscription: Subscription;
  selectedTheme: string;
  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.theme$ = this.themeService.getTheme();
    this.themeSubscription = this.theme$.subscribe((value) => {
      if (value != null) {
        this.selectedTheme = value.id;
      }
    })
  }

  deleteTag(index) {
    this.tags.splice(index, 1)
  }

  createNewTag() {
    this.tags.push(this.newTag);
    this.newTag = "";
  }
}
