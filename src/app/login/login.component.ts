import { Component, Inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <form (ngSubmit)="onSubmit()">
        <input type="email" [(ngModel)]="email" name="email" required placeholder="Email">
        <input type="password" [(ngModel)]="password" name="password" required placeholder="Mot de passe">
        <button type="submit">Connexion</button>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        console.log('Vous êtes connecté', data);
        localStorage.setItem('token', data.token); // Stocker le token
        this.router.navigate(['/admin/room']); // Redirection
      },
      error => {
        console.error('Échec de connexion', error);
      }
    );
  }
}