import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  
    {
        path: 'login',
        component: LoginComponent,
        title: 'Authentification'
    },
    {
        path: 'room',
        loadChildren: () => import('../app/room/room.routes').then(routes => routes.ROOMS_ROUTES),
        canActivate: [AuthGuard]
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

