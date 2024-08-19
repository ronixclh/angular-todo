import { Component, OnInit, inject } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MatDialog } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { EmailValidatorDialog } from './email-validator/dialog.email.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  isEmailCorrect: boolean = false;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    const dialogRef = this.dialog.open(EmailValidatorDialog, {
      data: {
        isEmailCorrect: this.isEmailCorrect,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result !== undefined) {
        this.isEmailCorrect = true;
      }
    });
  }
}
