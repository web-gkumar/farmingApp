import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
// import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../shared/services/auth';

declare var google: any;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit, AfterViewInit {

  user: any = null;

  constructor(private http: HttpClient, private authService: Auth) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // google.accounts.id.initialize({
    //   client_id: '394870904623-c2alhq89rj8r10r5402t5ksk72n440oi.apps.googleusercontent.com',
    //   callback: (response: any) => this.authService.handleGoogleResponse(response)
    // });

    // google.accounts.id.renderButton(
    //   document.getElementById('googleBtn'),
    //   {
    //     theme: 'outline',
    //     size: 'large',
    //   }
    // );
  }



  // async login() {
  //   try {
  //     if (Capacitor.getPlatform() === 'android') {
  //       this.user = await GoogleAuth.signIn();
  //     } else {
  //       this.user = await GoogleAuth.signIn();
  //     }
  //     console.log('USER:', this.user);
  //   } catch (error) {
  //     console.log('LOGIN ERROR', error);
  //   }
  // }

  // async logout() {
  //   await GoogleAuth.signOut();
  //   this.user = null;
  // }




}
