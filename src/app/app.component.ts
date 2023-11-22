import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { RoomItemComponent } from "./room-item/room-item.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <main>
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
    </main>
    `,
    styleUrl: './app.component.scss',
    imports: [CommonModule, NavbarComponent, RoomItemComponent, RouterModule], 
})

export class AppComponent {
}