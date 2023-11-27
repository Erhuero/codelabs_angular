import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list/room-list.component';
import { CreationRoomComponent } from './creation-room/creation-room.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        title: 'Accueil'
    },
    {
        path: 'room',
        component: RoomListComponent,
        title: 'Room List'
    },
    {
        path: 'room/create',
        component: CreationRoomComponent,
        title: 'Créer une Salle'
    }
];
//faire du lazy loading


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }