import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workplan } from '../models/workplan';

@Injectable({
  providedIn: 'root'
})
export class WorkplanService {
  private apiUrl = 'http://localhost:8080/api/workplans';

  constructor(private http: HttpClient) {}

  getAllWorkplans(): Observable<Workplan[]> {
    return this.http.get<Workplan[]>(this.apiUrl);
  }

  createWorkplan(Workplan: Workplan): Observable<Workplan> {
    return this.http.post<Workplan>(this.apiUrl, Workplan);
  }

  updateWorkplan(updatedWorkplan: Workplan): Observable<Workplan> {
    return this.http.put<Workplan>(this.apiUrl, updatedWorkplan);
  }

  deleteWorkplan(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
