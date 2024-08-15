import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  Inject,
} from '@angular/core';
import { CrudComponent } from '../service/crud.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

interface Todo {
  id: number;
  text: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: CrudComponent) {}

  readonly dialog = inject(MatDialog);

  openDialogDelete(todoId: number) {
    this.dialog.open(DialogElementsDeleteDialog, {
      data: {
        id: todoId,
        deleteMethod: this.removeTodo.bind(this),
      },
    });
  }

  openDialogEdit(todo: Todo) {
    this.dialog.open(DialogElementsEditDialog, {
      data: {
        todo: todo,
        editMethod: this.saveTodo.bind(this),
      },
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos.map((todo) => ({ ...todo, isEditing: false }));
      },
      error: (err) => {
        alert('Unable to get list of tasks');
      },
    });
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const newTodo: Todo = {
        id: 0,
        text: this.newTodo.trim(),
        isEditing: false,
      };
      this.todoService.addTodos(newTodo).subscribe({
        next: (todo) => {
          this.todos.push({ ...todo, isEditing: false });
          this.newTodo = '';
        },
        error: (err) => {
          alert('Unable to add todo');
        },
      });
    }
  }

  removeTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      error: (err) => {
        alert('Unable to remove todo');
      },
    });
  }

  saveTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }
}

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
