import { Pipe, PipeTransform } from '@angular/core';
import { TodoStatus } from '../models/todo.model';

@Pipe({
  name: 'todoStatusIcon'
})
export class TodoStatusIconPipe implements PipeTransform {

  transform(status: TodoStatus): unknown {
    return status === TodoStatus.Done ? "task_alt" : "hourglass_full";
  }
}
