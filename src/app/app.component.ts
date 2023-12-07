import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { authInterceptorProvider } from './auth/auth-interceptor.provider';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [authInterceptorProvider],
    template: `
      <main>
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
      </main>
    `,
    styleUrl: './app.component.scss',
    imports: [NavbarComponent, RouterOutlet], 
})

export class AppComponent {
}