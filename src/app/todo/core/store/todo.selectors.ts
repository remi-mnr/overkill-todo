import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Todo, TodoStatus } from '../models/todo.model';
import * as todoReducer from './todo.reducer';
import * as routerSelectors from '../../../core/router.selectors';

export const selectFeature = createFeatureSelector<todoReducer.TodoState>(todoReducer.featureKey);
 
export const selectTodos = createSelector(
    selectFeature,
    (state: todoReducer.TodoState) => state.todos
);

export const selectRequestState = createSelector(
    selectFeature,
    (state: todoReducer.TodoState) => state.requestState
);

export const selectoTodo = createSelector(
    selectTodos, 
    routerSelectors.selectRouteParams, 
    (todos: Todo[], { id }) => todos.filter((todo: Todo) => todo.id === id)[0]
);

export const selectoTodosOrdered = createSelector(
    selectTodos, 
    (todos: Todo[]) => [...todos].sort((a: Todo, b: Todo) => {
        if (a.status === TodoStatus.Done && b.status === TodoStatus.Todo) {
            return 1;
        } else if (a.status === TodoStatus.Todo && b.status === TodoStatus.Done) {
            return -1;
        } else {
            if(parseInt(a.createdAt) > parseInt(b.createdAt)) {
                return -1
            } else {
                return 1
            }
        }
    })
);