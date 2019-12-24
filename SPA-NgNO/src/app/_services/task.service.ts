import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TaskData } from '../_models/task-data.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl: string = 'http://localhost:53476/api/Task';

  constructor(private http: HttpClient) { }

 getTasks(): Observable<TaskData[]>{
    return this.http.get<TaskData[]>(this.apiUrl);
  }
  //

  //Add Test
  addTask(request: any): Observable<TaskData> {
    return this.http.post<TaskData>(this.apiUrl, request);
  }
  //get task
getTask(id: number): Observable<TaskData> {
    return this.http.get<TaskData>(this.apiUrl + '/' + id);
  }

  //update task
  updateTask(id: number, request: any): Observable<TaskData> {
    return this.http.put<TaskData>(this.apiUrl + '/' + id, request);
  }
  

  deleteTask(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }

 
}
