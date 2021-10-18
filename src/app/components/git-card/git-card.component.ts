import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme.interface';
import { DialogComponent } from '../dialog/dialog.component';
import { ThemeService } from '../theme/theme.service';
import { Person } from '../../interfaces/person.interface'

@Component({
  selector: 'git-card',
  templateUrl: './git-card.component.html',
  styleUrls: ['./git-card.component.scss']
})
export class GitCardComponent implements OnInit {
  @Input() items: Person[];
  theme$: Observable<Theme>;
  themeSubscription: Subscription;
  selectedTheme: string;
  constructor(
    private matDialog: MatDialog,
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

  openDialog(item) {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: item,
      width: '90vw',
    });
  }
}
