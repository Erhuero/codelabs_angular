import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar>
      <span>Réservations des locaux</span>
      <span class="example-spacer"></span>
      <h2>Bienvenue : {{ userName }}</h2>
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
