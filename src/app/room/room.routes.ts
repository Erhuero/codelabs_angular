import { Route, withComponentInputBinding } from "@angular/router";
import { CreationRoomComponent } from "../creation-room/creation-room.component";
import { ModificationRoomComponent } from "../modification-room/modification-room.component";
import { RoomListComponent } from "../room-list/room-list.component";

export const ROOMS_ROUTES: Route[] = [
    
    {
        path: '',
        component: RoomListComponent,
        title: 'Liste des rooms'
    },
    {
        path: 'create',
        component: CreationRoomComponent,
        title: 'Creation de rooms'
    },
    {
        path: ':roomId',
        loadComponent: () => import('../modification-room/modification-room.component').then(c => c.ModificationRoomComponent),
        title: 'Modification'
    }
]