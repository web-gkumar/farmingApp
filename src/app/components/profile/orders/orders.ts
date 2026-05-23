import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Crud } from '../../../shared/services/crud';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {

  crops: any[] = [];

  constructor(private _crudService: Crud, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.crops = JSON.parse(localStorage.getItem("orders") || "[]");

  }

  updateitem(c: any): void {
    this.router.navigate(['/update-post', c._id], { relativeTo: this.route });
  }

  removeItem(c: any): void {
  const confirmDelete = confirm('Do you really want to delete this item?');
  if (!confirmDelete) return;
  this._crudService.deleteItem(c._id).subscribe((res:any) => {
    this.crops = res;
  });
}

}
