import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Crud } from '../../shared/services/crud';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})


export class Profile implements OnInit {

  
  user: any = {};
  crops: any[] = [];
  
  constructor(private _crudService: Crud,) {}

  ngOnInit(): void {
    this.loadUserFromStorage("profile");
    this.getOrders();
  }

  loadUserFromStorage(key: string): void {
    const profile = localStorage.getItem(key);
    this.user = profile ? JSON.parse(profile) : {};
  }

  getOrders(): void {
    this._crudService.getOrders().subscribe({
      next: (res: any) => {
        this.crops = res.data;
        localStorage.setItem("orders", JSON.stringify(this.crops));
      }, error: (err) => {
        console.error('Load Orders Error:', err);
      }
    });
  }

  
}