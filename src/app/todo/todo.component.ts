import { Component, OnInit, inject } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsDeleteDialog } from './delete-dialog/dialog.element.delete.dialog';
import { DialogElementsEditDialog } from './edit-dialog/dialog.elements.edit.dialog';

export interface Todo {
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

  constructor(private todoService: CrudService) {}

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
