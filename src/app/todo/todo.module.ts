import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { TodoAddFormComponent } from './todo-add-form/todo-add-form.component';
import { TodoStatusIconPipe } from './core/pipes/todo-status-icon.pipe';
import { TodoEditFormComponent } from './todo-edit-form/todo-edit-form.component';
import * as TodoReducer from './core/store/todo.reducer';
import { TodoService } from './core/services/todo.service';
import { TodoEffects } from './core/store/todo.effects';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoAddFormComponent,
    TodoStatusIconPipe,
    TodoEditFormComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule,
    StoreModule.forFeature(TodoReducer.featureKey, TodoReducer.reducer),
    EffectsModule.forFeature([TodoEffects]),
    ReactiveFormsModule,
    OverlayModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [TodoService, MatSnackBar]
})
export class TodoModule { }
