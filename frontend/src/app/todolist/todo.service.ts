import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Activity {
  id?: number;
  description: string;
  isCompleted: boolean;
  isEditable: boolean;
  creationDate: Date;
  conclusionDate: Date;
}

interface ActivityRequest {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/activity';

  constructor(private http: HttpClient) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/get`);
  }

  createActivity(activity: ActivityRequest): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/create`, activity);
  }

  updateActivity(id: number, activity: ActivityRequest): Observable<Activity> {
    return this.http.patch<Activity>(`${this.apiUrl}/update/${id}`, activity);
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  completeActivity(id: number): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/complete/${id}`, null);
  }  

}
