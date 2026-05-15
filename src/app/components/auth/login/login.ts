import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, RouterModule, MatIconModule, MatInputModule, CommonModule, FormsModule, MatButton, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;


  constructor( private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: [ '', [ Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
    
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('profile', JSON.stringify(res.user));
          alert('Login Success');
          this.router.navigateByUrl('/profile');
        },
        error: (err: any) => {
          console.log(err);
          alert( err?.error?.message || 'Login Failed');
        }
      });
  }







}