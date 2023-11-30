import { Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { getEquipmentIcon, getAccessibilityIcon, Equipments, Room } from '../../room';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../room.service';

export interface EquipmentWithState {
  type: Equipments;
  selected: boolean;
}

@Component({
  selector: 'app-creation-room',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, FormsModule],
  template: `
    <div class="creation-room-container">
      <h2>Créer une nouvelle salle</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label for="address">Adresse</label>
          <input id="address" type="text" placeholder="Adresse" [(ngModel)]="room.address" [ngModelOptions]="{standalone: true}"/>
        </div>
        
        <div class="form-field">
          <label for="capacity">Effectif</label>
          <input id="capacity" type="number" placeholder="Entrez un nombre" [(ngModel)]="room.capacity" [ngModelOptions]="{standalone: true}"/>
        </div>
            
        <div class="form-field">
          <label for="telephone">Téléphone</label>
          <input id="telephone" type="telephone" placeholder="Téléphone" [(ngModel)]="room.telephone" [ngModelOptions]="{standalone: true}"/>
        </div>
        
        <div class="form-field">
          <label for="accessibility">Accessible Handicapé ?</label>
          <input id="accessibility" type="checkbox" [(ngModel)]="room.accessibility" [ngModelOptions]="{standalone: true}"/>
        </div>
        
        <div class="form-field equipment-checkboxes">
          <label>Équipements:</label>
          <div *ngFor="let equipment of equipements; let i = index" class="equipment-checkbox">
          <input type="checkbox" [id]="'equipment' + i" [(ngModel)]="equipment.selected" [name]="'equipment' + i" [ngModelOptions]="{standalone: true}">

            <label [for]="'equipment' + i">
              <mat-icon>{{ getIcon(equipment.type) }}</mat-icon>
            </label>
          </div>
        </div>
        
        <div class="form-actions">
        <button type="button" class="cancel-button" (click)="onCancel()">Annuler</button>
          <button type="submit" class="submit-button">Enregistrer</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./creation-room.component.scss']
})

export class CreationRoomComponent {
 
  room: Omit<Room, 'id'> = { // 'Omit' exclut 'id' de l'interface 'Room'
    address: '',
    capacity: '',
    telephone: '',
    accessibility: false,
    equipments: [],
  };

    equipements: EquipmentWithState[] = [
      { type: Equipments.TABLE, selected: false },
      { type: Equipments.VISIO, selected: false }
    ];
    accessibility = true; 

    constructor(
      private roomService: RoomService,
      private router: Router) {}


    onSubmit() {
      this.room.equipments = this.equipements
      .filter(equipment => equipment.selected)
      .map(equipment => Equipments[equipment.type]);
  
      // Appel à RoomService pour enregistrer la salle
      this.roomService.addRoom(this.room as Room).subscribe({
        next: (room) => {
          const userConfirmed = window.confirm('Envoi réussi ! Cliquez sur OK pour revenir a la liste des salles');
          if(userConfirmed){
            this.router.navigate(['/admin/room']);
          }
        },
        error: (error) => {
          window.alert('Echec de l\'envoi :' + error);
        }
      });
    }

    onCancel() {
      const userConfirmed = window.confirm('Êtes-vous sûr de vouloir annuler ?');
      if (userConfirmed) {
        this.router.navigate(['/admin/room']);
      }
    }

    getEquipmentIcon = getEquipmentIcon;
    getAccessibilityIcon = getAccessibilityIcon;

    getIcon(equipment: Equipments): string {
      // Utilisez la fonction existante getEquipmentIcon avec la conversion nécessaire
      return getEquipmentIcon(Equipments[equipment]);
    }
}
