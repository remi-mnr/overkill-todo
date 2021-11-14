import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { Todo } from '../core/models/todo.model';
import * as TodoActions from '../core/store/todo.actions';
import { RequestState } from '../core/store/todo.reducer';
import * as TodoSelectors from '../core/store/todo.selectors';

@Component({
  selector: 'app-todo-edit-form',
  templateUrl: './todo-edit-form.component.html',
  styleUrls: ['./todo-edit-form.component.scss']
})
export class TodoEditFormComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private store: Store) { }

  readonly RequestState$: Observable<RequestState> = this.store.select(TodoSelectors.selectRequestState);
  readonly RequestState = RequestState

  myForm = this.fb.group({
    id: null,
    title: [null, Validators.required],
    description: null,
    status: null,
    deadline: null,
    createdAt: null
  });
  
  private ngUnsubscribe = new Subject();
  
  ngOnInit(): void {
    this.store.select(TodoSelectors.selectoTodo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(todo => {
        this.myForm.patchValue({...todo}, {emitEvent: false})
      })
    
    this.myForm.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(() => this.myForm.valid),
        debounceTime(1000),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe(val => this.updateTodo(val))
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateTodo(val: any): void {
    const todo: Todo = {
      id: val.id,
      title: val.title,
      description: val.description,
      status: val.status,
      createdAt: val.createdAt,
      ...(this.myForm.value.deadline && { deadline: this.myForm.value.deadline })
    };
    this.store.dispatch(TodoActions.updateTodo({
      id: val.id,
      todo: todo
    }))
  }

}
