import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {


  constructor(private router: Router) {}

  ngOnInit() {
    GoogleAuth.initialize({
      clientId: '394870904623-c2alhq89rj8r10r5402t5ksk72n440oi.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }

  async googleLogin() {
    try {
      const result = await GoogleAuth.signIn();
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }


}