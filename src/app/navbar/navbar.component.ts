import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar>
      <span>Réservations des locaux</span>
        <div class="welcome-container">
          <span>Bienvenue : {{ userName }}</span>
        </div>
      <span class="example-spacer"></span>
    </mat-toolbar>
  `,
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  userName: string;

  constructor(private loginService: LoginService){
    this.userName = this.loginService.getUserName() ?? 'Utilisateur';
  }
}
