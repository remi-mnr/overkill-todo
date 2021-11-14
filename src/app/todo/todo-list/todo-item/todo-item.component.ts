import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo, TodoStatus } from '../../core/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;

  @Output() statusChanged = new EventEmitter<TodoStatus>();

  changeStatus(checked: boolean): void {
    this.statusChanged.emit(checked ? TodoStatus.Done : TodoStatus.Todo);
  }

  get isChecked(): boolean {
    return this.todo?.status === TodoStatus.Done;
  }
}
