import { Action, createReducer, on } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import * as TodoActions from './todo.actions';

export enum RequestState {
    Initial = 'initial',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export interface TodoState {
    todos: Todo[];
    requestState: RequestState;
}

export const initialState: TodoState = {
    todos: [],
    requestState: RequestState.Initial,
}

const todoReducer = createReducer(
    initialState,
    on(TodoActions.loadTodos, state => ({ ...state, requestState: RequestState.Loading  })),
    on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos, requestState: RequestState.Success  })),
    on(TodoActions.loadTodosError,  state => ({ ...state, requestState: RequestState.Error  })),
    on(TodoActions.updateTodoStatusSuccess,  (state, { todo }) => ({ ...state, todos: [...state.todos.map((stateTodo) => stateTodo.id === todo.id ? todo : stateTodo)]  })),
    on(TodoActions.addTodo, state => ({ ...state, requestState: RequestState.Loading  })),
    on(TodoActions.addTodoSuccess, (state, { todo }) => ({ 
        ...state,
        todos: [ ...state.todos, todo],
        requestState: RequestState.Success
    })),
    on(TodoActions.addTodoError,  state => ({ ...state, requestState: RequestState.Error  })),
    on(TodoActions.updateTodo, state => ({ ...state, requestState: RequestState.Loading  })),
    on(TodoActions.updateTodoSuccess, (state, { todo }) => ({ 
        ...state,
        todos: [...state.todos.map(stateTodo => stateTodo.id === todo.id ? todo : stateTodo)],
        requestState: RequestState.Success
    })),
    on(TodoActions.updateTodoError,  state => ({ ...state, requestState: RequestState.Error  })),
);
  
export function reducer(state: TodoState | undefined, action: Action) {
    return todoReducer(state, action);
}

export const featureKey = 'todo';
