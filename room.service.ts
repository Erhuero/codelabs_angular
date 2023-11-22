// room.service.ts
import { Injectable } from '@angular/core';
import { Room, Equipements } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: Room[] = [
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
  ];

  constructor() {}

  getRooms(): Room[] {
    return this.rooms;
  }
// affiche salle par IdD
getRoomById(id: number): Room | undefined {
    return this.rooms.find(room => room.id === id);
  }

  // Ajoute une nouvelle salle
  addRoom(room: Room): void {
    this.rooms.push(room);
  }

  // Mise à jour une salle existante
  updateRoom(room: Room): void {
    const index = this.rooms.findIndex(r => r.id === room.id);
    if (index !== -1) {
      this.rooms[index] = room;
    }
  }

  // Supprime une salle
  deleteRoom(id: number): void {
    this.rooms = this.rooms.filter(room => room.id !== id);
  }
}
