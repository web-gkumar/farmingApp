import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-aboutus',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './aboutus.html',
  styleUrl: './aboutus.scss',
})
export class Aboutus implements OnInit {

  profileForm!: FormGroup;
  user: any = {};

  constructor(private fb: FormBuilder, private _auth: Auth,) { }

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
        }
      }
    });
  }



  

}
