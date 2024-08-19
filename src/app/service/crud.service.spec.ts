import { TestBed } from '@angular/core/testing';
import { CrudService } from './crud.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Todo } from '../todo/todo.component';

describe('CrudService', () => {
  let service: CrudService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudService],
    }).compileComponents();

    service = TestBed.inject(CrudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve todos from the API via GET', () => {
    const dummyTodos: Todo[] = [
      { id: 1, text: 'Todo 1', isEditing: false },
      { id: 2, text: 'Todo 2', isEditing: false },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(dummyTodos);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTodos);
  });

  it('should delete todos from the API via DELETE', () => {
    const dummyTodos: Todo[] = [
      { id: 1, text: 'Todo 1', isEditing: false },
      { id: 2, text: 'Todo 2', isEditing: false },
    ];

    service.deleteTodo(dummyTodos[0].id).subscribe((res) => {
      expect(res).toBeNull();
    });

    const request = httpMock.expectOne(
      `${service['apiUrl']}/${dummyTodos[0].id}`
    );
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
