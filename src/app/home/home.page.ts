import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkDone, trash, openOutline } from 'ionicons/icons';
import { Todos } from 'src/models/todos.interface';
import { ToastControllerService } from 'src/services/toast-controller.service';
import { TodoService } from 'src/services/todo.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [TodoService, ToastControllerService],
  standalone: true,
  imports: [IonIcon, NgClass, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, HttpClientModule],
})
export class HomePage {

  taskId!: number;
  taskTitle!: string;
  editing: boolean = false;
  tasks: Todos[] = [];
  beforeEditing!: string;
  beforeEdit: string = "";
  afterEdit: string = "";
  currentlyEditingTask: Todos | null = null;

  constructor(private todoService: TodoService, private toastController: ToastControllerService) {
    addIcons({ checkmarkDone, trash, openOutline });
  }

  ngOnInit() {
    this.taskTitle = '';
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos()
      .subscribe(data => this.tasks = data);
  }

  addTask() {
    if (this.taskTitle.trim().length === 0) return;

    this.todoService.addTodo({
      id: this.taskId,
      todo: this.taskTitle,
      completed: false,
      editing: false
    }).subscribe((data: Todos) => {
      this.tasks.push(data);
      this.toastController.showToast('Task added successfully');
    });

    this.taskTitle = '';
  }

  doneEditing(task: Todos) {
    if (task.todo.trim().length === 0) {
      task.todo = this.beforeEditing;
    }
    task.editing = false;
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.todoService.deleteTodo(taskId)
      .subscribe(() => {
        this.toastController.showToast('Task deleted successfully');
      });
  }

  before(task: Todos) {
    if (this.currentlyEditingTask) {
      this.currentlyEditingTask.editing = false;
    }
    this.beforeEdit = task.todo;
    task.editing = true;
    this.currentlyEditingTask = task;
  }

  after(task: Todos) {
    this.afterEdit = task.todo;
    if (this.afterEdit !== this.beforeEdit) {
      this.updateTask(task);
    } else {
      this.beforeEdit = '';
    }
    if (task.todo.trim().length > 0) {
      task.editing = false;
    }
    this.currentlyEditingTask = null;
  }

  updateTask(task: Todos) {
    if (this.afterEdit !== this.beforeEdit && task.todo.trim().length > 0) {
      this.todoService.updateTodo(task.id, task.todo.trim())
        .subscribe(
          updatedTodo => {
            this.tasks = this.tasks.map(t => t.id === task.id ? { ...t, ...updatedTodo } : t);
            this.toastController.showToast('Task updated successfully');
          }
        );
    }
  }
}
