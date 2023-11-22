import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list/room-list.component'; // Assurez-vous que le chemin est correct

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        title: 'Accueil'
    },
    {
        path: 'room',
        component: RoomListComponent, // Utilisez RoomListComponent ici
        title: 'Room List'
    }
];

export default routes;