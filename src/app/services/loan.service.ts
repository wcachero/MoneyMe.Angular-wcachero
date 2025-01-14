import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanDetails } from '../models/loanDetail.model';


@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'https://wcachero99.azurewebsites.net/api/customerDetail';

  constructor(private http: HttpClient) {}

   getAll(): Observable<LoanDetails[]> {
      return this.http.get<LoanDetails[]>(this.apiUrl);
    }
    updateLoanDetails(id: string, loanDetails: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/loandetail`, loanDetails);
    }
    getLoanDetailsByCustomerId(guid: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/loandetail/${guid}`);
    }
  

    saveLoanData(loanData: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, loanData);
    }
    create(LoanData: LoanDetails): Observable<any> {
      return this.http.post(this.apiUrl, LoanData);
    }
    getLoanDataByGuid(guid: string): Observable<LoanDetails> {
      const url = `${this.apiUrl}/loanDetail/${guid}`;
      return this.http.get<LoanDetails>(url);
    }
}