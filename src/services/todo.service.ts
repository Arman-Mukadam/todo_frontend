import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { domain } from 'src/environments/environment';
import { Todos } from 'src/models/todos.interface';
// import { Tasks } from '../models/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  getTodos(): Observable<any[]> {
    const url = `${domain}/getTodos`;
    return this.http.get<any[]>(url);
  }

  deleteTodo(id: number): Observable<any> {
    const url = `${domain}/deleteTodo/${id}`;
    return this.http.delete<any>(url)
  }

  addTodo(task: Todos): Observable<Todos> {
    const url = `${domain}/addTodo`;
    console.log("add api requested");
    return this.http.post<Todos>(url, task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateTodo(id: number, todo: string): Observable<any> {
    const url = `${domain}/updateTodo/${id}`;
    // const body = { todo };
    console.log("update api requested");
    return this.http.put<any>(url, { todo });
  }

}