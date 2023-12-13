import { Route } from "@angular/router";
import { RoomListComponent } from "../room-list/room-list.component";
import { RoomFormComponent } from "../room-form/room-form.component";

export const ROOMS_ROUTES: Route[] = [
    {
        path: '',
        component: RoomListComponent,
        title: 'Liste des rooms'
    },
    {
        path: 'create',
        component: RoomFormComponent,
        title: 'Creation de rooms'
    },
    {
        path: ':roomId',
        loadComponent: () => import('../room-form/room-form.component').then(c => c.RoomFormComponent),
        title: 'Modification de Room'
    }
]