// room.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room, Equipements } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsSource = new BehaviorSubject<Room[]>([
    {
        id: 1,
        capacity: '50',
        accessibility: true,
        equipements: [Equipements.TABLE, Equipements.VISIO],
        address: '123 Main St, Anytown',
        telephone: '123-456-7890'
    },
    {
        id: 2,
        capacity: '100',
        accessibility: false,
        equipements: [Equipements.TABLE],
        address: '456 Elm St, Sometown',
        telephone: '234-567-8901'
      },
      {
        id: 3,
        capacity: '200',
        accessibility: true,
        equipements: [Equipements.VISIO],
        address: '789 Maple Ave, Yourtown',
        telephone: '345-678-9012'
      }
    ]);
    rooms$ = this.roomsSource.asObservable();

  constructor() {}

  getRooms(): Observable<Room[]> {
    return this.rooms$;
  }

  // Ajoute une nouvelle salle
  addRoom(room: Room): void {
    const currentRooms = this.roomsSource.getValue();
    this.roomsSource.next([...currentRooms, room]);
  }

  // Mise à jour une salle existante
  updateRoom(updatedRoom: Room): void {
    const rooms = this.roomsSource.getValue();
    const index = rooms.findIndex(room => room.id === updatedRoom.id);
    if (index !== -1) {
      rooms[index] = updatedRoom;
      this.roomsSource.next([...rooms]);
    }
  }
//retourner un observable de room (gagne de temps)
//creer le routing avec un menu

  // Supprime une salle
  deleteRoom(id: number): void {
    const rooms = this.roomsSource.getValue().filter(room => room.id !== id);
    this.roomsSource.next(rooms);
  }
}
