import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Todo } from '../todo.component';

@Component({
  selector: 'dialog-elements-edit-dialog',
  templateUrl: 'dialog.elements.edit.dialog.html',
  styleUrls: ['./dialog.elements.edit.dialog.css'],
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsEditDialog {
  newTodo: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { todo: Todo; editMethod: (todo: Todo) => void },
    private dialogRef: MatDialogRef<DialogElementsEditDialog>
  ) {}
  confirmEdit(): void {
    this.data.todo.text = this.newTodo;
    this.data.editMethod(this.data.todo);
    this.dialogRef.close();
  }
}
