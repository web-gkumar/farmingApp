import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, RouterModule, MatIconModule, MatInputModule, CommonModule, ReactiveFormsModule, FormsModule, MatButton, MatCheckboxModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  signupForm: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private auth: Auth) {

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    // const password = this.signupForm.value.password;
    // const confirmPassword = this.signupForm.value.confirmPassword;
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }
    this.auth.signup(this.signupForm.value).subscribe(res => {
      alert('Registration successful! Please login.');
      this.signupForm.reset();
    });

  }





}
