export interface Todo {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
    deadline?: string;
    createdAt: string;
}

export enum TodoStatus {
    Done = 'done',
    Todo = 'todo',
}
