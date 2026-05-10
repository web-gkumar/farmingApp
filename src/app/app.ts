import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('myApp');
  opened = false;
  constructor() {
    this.initGoogle();
  }

  async initGoogle() {
    await GoogleAuth.initialize({
      clientId: '394870904623-c2alhq89rj8r10r5402t5ksk72n440oi.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

  }

  
}
