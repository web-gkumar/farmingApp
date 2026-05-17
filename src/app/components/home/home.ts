import { Component, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    autoplay: true,
    nav: false,
    responsive: {
      0: {items: 1},
      400: {items: 2},
      740: {items: 3},
      940: {items: 4}
    },
    
  }

  crops: any[] = [];
  
ngOnInit(): void {
  this.crops = localStorage.getItem('my-orders') ? JSON.parse(localStorage.getItem('my-orders')!) : [];
}



}
