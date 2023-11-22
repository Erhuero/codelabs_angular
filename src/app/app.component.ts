import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { TitreComponent } from "./titre/titre.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
   <main>
      <header class="navbar">
        <app-navbar></app-navbar>
      </header>
    <section class="content">
      <div>
        <app-titre></app-titre>
      </div>
    </section>
</main>
  `,
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, NavbarComponent, TitreComponent]
})
export class AppComponent {
  title = 'codelabs_angular';
}