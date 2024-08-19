import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-elements-delete-dialog',
  templateUrl: 'dialog.elements.delete.dialog.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsDeleteDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; deleteMethod: (id: number) => void },
    private dialogRef: MatDialogRef<DialogElementsDeleteDialog>
  ) {}

  confirmDelete(): void {
    this.data.deleteMethod(this.data.id);
    this.dialogRef.close();
  }
}
