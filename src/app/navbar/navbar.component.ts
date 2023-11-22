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
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <span>Réservation des locaux</span>
      <span class="example-spacer"></span>
      <button mat-icon-button> 
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>search</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>more_vert</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {}
