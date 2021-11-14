import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo, TodoStatus } from '../core/models/todo.model';
import * as TodoActions from '../core/store/todo.actions';
import * as TodoSelectors from '../core/store/todo.selectors';
import { RequestState } from '../core/store/todo.reducer';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  requestState$: Observable<RequestState> = this.store.select(TodoSelectors.selectRequestState);
  todos$: Observable<Todo[]> = this.store.select(TodoSelectors.selectoTodosOrdered);

  RequestStates = RequestState;

  constructor(private store: Store) {}

  updateStatus(status: TodoStatus, id: string): void {
    this.store.dispatch(TodoActions.updateTodoStatus({ status, id }))
  }
}