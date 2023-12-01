import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list/room-list.component';
import { CreationRoomComponent } from './creation-room/creation-room.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ModificationRoomComponent } from './modification-room/modification-room.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'admin/room',
        component: RoomListComponent,
        title: 'Liste des salles'
    },
    {
        path: 'admin/room/create',
        component: CreationRoomComponent,
        title: 'Créer une Salle'
    },
    {
        path: 'admin/room/:id',
        component: ModificationRoomComponent,
        title: 'Modifier la Salle'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Authentification'
    }
];
//faire du lazy loading

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }