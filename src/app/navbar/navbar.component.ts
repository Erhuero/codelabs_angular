import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar>
      <span>Réservation des locaux</span>
      <span class="example-spacer"></span>
    </mat-toolbar>
  `,
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {}
