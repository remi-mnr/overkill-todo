import { createAction, props } from '@ngrx/store';

import { Todo, TodoStatus } from '../models/todo.model';

export const loadTodos = createAction('[Todo] Load todos');
export const loadTodosSuccess = createAction('[Todo] Load todos success', props<{todos: Todo[]}>());
export const loadTodosError = createAction('[Todo] Load todos error');

export const addTodo = createAction('[Todo] Add todo', props<{todo: Todo}>());
export const addTodoSuccess = createAction('[Todo] Add todo success', props<{todo: Todo}>());
export const addTodoError = createAction('[Todo] Add todo error');

export const updateTodoStatus = createAction('[Todo] Update todo status', props<{ status: TodoStatus,  id: string }>());
export const updateTodoStatusSuccess = createAction('[Todo] Update todo status success', props<{ todo: Todo }>());
export const updateTodoStatusError = createAction('[Todo] Update todo status error');

export const updateTodo = createAction('[Todo] Update todo', props<{ id: string, todo: Todo }>());
export const updateTodoSuccess = createAction('[Todo] Update todo success', props<{ todo: Todo }>());
export const updateTodoError = createAction('[Todo] Update todo error');
