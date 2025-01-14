import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanDetails } from '../models/loanDetail.model';

const baseUrl = 'https://wcachero99.azurewebsites.net/api/customerdetail/api/customerDetail';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  
  getAll(): Observable<LoanDetails[]> {
    return this.http.get<LoanDetails[]>(baseUrl);
  }

  get(id: any): Observable<LoanDetails> {
    return this.http.get<LoanDetails>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(product: any): Observable<LoanDetails[]> {
    return this.http.get<LoanDetails[]>(`${baseUrl}?Term=${product}`);
  }
}
