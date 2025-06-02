import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  private apiUrl = 'https://santam-tasklist-backend-3d8241836505.herokuapp.com';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl+"/tasks");
  }

  createTask(task: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/tasks`, task, { headers });
  }

  updateTask(id: number, task: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Updating task with ID:', id, 'and data:', task);
    return this.http.put(`${this.apiUrl}/tasks/${id}`, task, { headers });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

}
