import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
