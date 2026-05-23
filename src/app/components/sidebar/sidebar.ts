import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [MatListModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  @Output() menuClick = new EventEmitter<void>();

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  get token() {
    return localStorage.getItem('token');
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
