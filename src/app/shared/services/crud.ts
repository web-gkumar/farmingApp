import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Crud {

  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) { }


  getOrders() {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  addOrder(formData: FormData) {
    return this.http.post(`${this.apiUrl}/orders`, formData);
  }

  updateOrder(id: any, formData: FormData) {
    return this.http.put(`${this.apiUrl}/orders/${id}`, formData);
  }

  deleteItem(id: any) {
    return this.http.delete(`${this.apiUrl}/orders/${id}`);
  }

}
