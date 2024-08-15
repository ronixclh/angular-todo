import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  Inject,
  signal,
} from '@angular/core';
import { NavComponent } from './nav/nav.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavComponent, CommonModule],
})
export class AppComponent implements OnInit {
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

@Component({
  selector: 'email-validator',
  templateUrl: './dialog.email.validator.html',
  styleUrls: ['./dialog.email.validator.css'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailValidatorDialog {
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { isEmailCorrect: boolean },
    private dialogRef: MatDialogRef<EmailValidatorDialog>
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  clearEmail() {
    this.email.reset();
  }
}
