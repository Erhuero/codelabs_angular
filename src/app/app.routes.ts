import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  
    {
        path: 'login',
        component: LoginComponent,
        title: 'Authentification'
    },
    {
        path: 'room',
        loadChildren: () => import('../app/room/room.routes').then(routes => routes.ROOMS_ROUTES)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
//faire du lazy loading

