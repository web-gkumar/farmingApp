import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Crud } from '../../shared/services/crud';
import { Auth } from '../../shared/services/auth';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class Profile implements OnInit {

  profileForm!: FormGroup;
  user: any = {};
  crops: any[] = [];

  constructor(private _auth: Auth, private _crudService: Crud, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUserFromStorage("profile");
    this.profileForm = this.fb.group({
      name: [this.user?.name || ''],
      mobile: [this.user?.mobile || ''],
      email: [this.user?.email || ''],
      village: [this.user?.village || ''],
      district: [this.user?.district || ''],
      state: [this.user?.state || ''],
      pincode: [this.user?.pincode || ''],
      address: [this.user?.address || ''],
      country: [this.user?.country || 'India']
    });
      this.getOrders();
  }

  loadUserFromStorage(key: string): void {
    const profile = localStorage.getItem(key);
    this.user = profile ? JSON.parse(profile) : {};
  }

  submitProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const payload = { ...this.profileForm.value, mobile: String(this.profileForm.value.mobile), pincode: String(this.profileForm.value.pincode) };
    this._auth.updateProfile(payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.user = res.user;
          localStorage.setItem('profile', JSON.stringify(res.user));
          alert('Profile updated successfully');
          this.loadUserFromStorage("profile");
        }
      },
      error: (err) => { alert(err?.error?.message || 'Profile update failed'); }
    });
  }

  getOrders(): void {
    if (!this.user?._id) return;
    this._crudService.getOrders().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.crops = res.data || [];
          localStorage.setItem('my-orders', JSON.stringify(res.data));
        }
      }, error: (err) => {
        console.error('Load Orders Error:', err);
      }
    });
  }


  updateitem(c: any): void {
    this.router.navigate(['../update-post', c._id], { relativeTo: this.route });
  }

  removeItem(c: any): void {
    const confirmDelete = confirm('Do you really want to delete this item?');
    if (!confirmDelete) return;
    this._crudService.deleteItem(c._id).subscribe((res:any) => {
      this.crops = res.data || [];
    });
  }



}