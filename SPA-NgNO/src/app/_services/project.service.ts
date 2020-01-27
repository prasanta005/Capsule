import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TaskData } from '../_models/task-data.model';
import { UserData } from '../_models/user-data.model';
import { ProjectData } from '../_models/project-data.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl: string = 'http://localhost:53476/api/Project';

  constructor(private http: HttpClient) { }

  
  
  
 getProjects(): Observable<ProjectData[]>{
    return this.http.get<ProjectData[]>(this.apiUrl);
  }
  //

  //Add Project
  addProject(request: any): Observable<ProjectData> {
    return this.http.post<ProjectData>(this.apiUrl, request);
  }
  //get Project
getProject(id: number): Observable<ProjectData> {
    return this.http.get<ProjectData>(this.apiUrl + '/' + id);
  }

  //update Project
  updateProject(id: number, request: any): Observable<ProjectData> {
    return this.http.put<ProjectData>(this.apiUrl + '/' + id, request);
  }
  

  deleteProject(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }
 
}
