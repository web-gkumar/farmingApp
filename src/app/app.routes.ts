import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard'

export const routes: Routes = [
  { path: '', redirectTo: 'home',pathMatch: 'full'},
  { path: 'login', loadComponent: () => import('./components/auth/login/login').then(m => m.Login)},
  { path: 'signup', loadComponent: () => import('./components/auth/signup/signup').then(m => m.Signup)},

  { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.Home)},
  { path: 'profile', loadComponent: () => import('./components/profile/profile').then(m => m.Profile), canActivate: [authGuard]},
  { path: 'create-post', loadComponent: () => import('./components/create-post/create-post.component').then(m => m.CreatePostComponent)},
  { path: 'update-post/:id', loadComponent: () => import('./components/create-post/create-post.component').then(m => m.CreatePostComponent)},
  { path: '**', redirectTo: 'home'}
];