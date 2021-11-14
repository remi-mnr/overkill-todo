import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Todo, TodoStatus } from '../core/models/todo.model';
import { TodoService } from '../core/services/todo.service';
import * as TodoActions from '../core/store/todo.actions';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss']
})
export class TodoAddFormComponent {

  constructor(private fb: FormBuilder, private store: Store, private router: Router, private service: TodoService) {}

  myForm = this.fb.group({
    title: [null, Validators.required],
    description: null,
    deadline: null
  });

  addTodo(): void {
    const todo: Todo = {
      id: Math.round(Math.random()*100000).toString(),
      title: this.myForm.value.title,
      description: this.myForm.value.description,
      status: TodoStatus.Todo,
      createdAt: Date.now().toString(),
      ...(this.myForm.value.deadline && { deadline: this.myForm.value.deadline })
    }
    
    this.store.dispatch(TodoActions.addTodo({ todo }))
    this.router.navigate(["/","todos"])
  }
}
