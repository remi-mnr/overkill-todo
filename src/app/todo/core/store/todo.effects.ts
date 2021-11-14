import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { TodoService } from '../services/todo.service';
import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects implements OnInitEffects {
    
    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.loadTodos),
        mergeMap(() => this.service.fetchTodos()
            .pipe(
                map(todos => (TodoActions.loadTodosSuccess({ todos }))),
                catchError(() => [TodoActions.loadTodosError()])
            )
        )
    ));

    addTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.addTodo),
        mergeMap(
            ({ todo }) => this.service.addTodo(todo).pipe(
                map(todo => (TodoActions.addTodoSuccess({ todo }))),
                catchError(() => [TodoActions.addTodoError()])
            )
        )
    ));

    updateTodoStatus$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.updateTodoStatus),
        mergeMap(
            ({ status, id }) => this.service.updateTodoStatus(status, id).pipe(
                map(todo => (TodoActions.updateTodoStatusSuccess({ todo }))),
                catchError(() => [TodoActions.updateTodoStatusError()])
            )
        )
    ));

    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.updateTodo),
        mergeMap(
            ({ id, todo }) => this.service.updateTodo(id, todo).pipe(
                map(todo =>(TodoActions.updateTodoSuccess({ todo }))),
                catchError(() => [TodoActions.updateTodoError()])
            )
        )
    ));

    onError$ = createEffect(() => this.actions$.pipe(
        ofType(
            TodoActions.loadTodosError,
            TodoActions.updateTodoStatusError,
            TodoActions.updateTodoError,
            TodoActions.addTodoError,
        ),
        tap(() => this.snackBar.open('ERROR')),
    ), { dispatch: false })

    ngrxOnInitEffects(): Action {
        return TodoActions.loadTodos();
    }
 
    constructor(
        private actions$: Actions,
        private service: TodoService,
        private snackBar: MatSnackBar
    ) {}
}