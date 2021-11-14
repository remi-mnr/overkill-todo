import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry, tap } from 'rxjs/operators';

import { Todo, TodoStatus } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) {}

    // Fake delay to simulate network

    fetchTodos(): Observable<Todo[]> {
      return this.http.get<Todo[]>("http://localhost:3000/todos").pipe(delay(1000));
    };

    addTodo(todo: Todo): Observable<Todo> {
      return this.http.post<Todo>("http://localhost:3000/todos", todo).pipe(delay(1000));
    }

    updateTodoStatus(status: TodoStatus, id: string,): Observable<Todo> {
      return this.http.patch<Todo>(`http://localhost:3000/todos/${id}`, {status}).pipe(delay(1000))
    }

    updateTodo(id: string, todo: Todo): Observable<Todo> {
      return this.http.put<Todo>(`http://localhost:3000/todos/${id}`, {...todo}).pipe(delay(1000));
    }
}