import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlacklistedPhoneService {
  private apiUrl = 'https://wcachero99.azurewebsites.net/api/customerdetail/api';

  constructor(private http: HttpClient) {}

  getBlacklistedPhones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blacklistedPhoneNumbers`);
  }

  addBlacklistedPhone(phoneNumber: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/blacklistedPhoneNumbers`, { phoneNumber, isActive: true });
  }
  getBlacklistedEmailDomains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blackListedEmailDomain`);
  }

  addBlacklistedEmailDomain(domain: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/blackListedEmailDomain`, domain);
  }
}