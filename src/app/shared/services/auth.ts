import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  forgotPassword(data: any) {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }
  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }






  get token(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem('token');
  }

  updateProfile(data: any) {
    return this.http.put(`${this.apiUrl}/profile`, data);
  }




}
