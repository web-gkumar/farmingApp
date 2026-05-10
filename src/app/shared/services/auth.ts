import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  handleGoogleResponse(response: any) {
    const idToken = response.credential;
    this.http.post(`${this.apiUrl}/google-login`, { idToken })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('profile', JSON.stringify(res.user));
          alert('Login Success');
          this.router.navigateByUrl('tabs/profile');
        },
        error: (err) => {
          console.error(err);
          alert('Backend Google Login Failed');
        },
      });
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
