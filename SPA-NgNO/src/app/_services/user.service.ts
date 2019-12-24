import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TaskData } from '../_models/task-data.model';
import { UserData } from '../_models/user-data.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'http://localhost:53476/api/User';

  constructor(private http: HttpClient) { }

  
  
  
 getUsers(): Observable<UserData[]>{
    return this.http.get<UserData[]>(this.apiUrl);
  }
  //

  //Add User
  addUser(request: any): Observable<UserData> {
    return this.http.post<UserData>(this.apiUrl, request);
  }
  //get User
getUser(id: number): Observable<UserData> {
    return this.http.get<UserData>(this.apiUrl + '/' + id);
  }

  //update User
  updateUser(id: number, request: any): Observable<UserData> {
    return this.http.put<UserData>(this.apiUrl + '/' + id, request);
  }
  

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }
 
}
