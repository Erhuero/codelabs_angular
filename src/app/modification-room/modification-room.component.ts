import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipments, Room, getAccessibilityIcon, getEquipmentIcon } from '../../room';
import { EquipmentWithState } from '../creation-room/creation-room.component';
import { RoomService } from '../../room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modification-room',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  template: `
    <div class="creation-room-container">
      <h2>Modifier la salle</h2>
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
          <input id="accessibility" type="checkbox"/>
        </div>
        
        <div class="form-field equipment-checkboxes">
          <label>Équipements:</label>
          <div *ngFor="let equipment of equipements; let i = index" class="equipment-checkbox">
          <input type="checkbox" [id]="'equipment' + i" [(ngModel)]="equipment.selected" [ngModelOptions]="{standalone: true}">
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
  styleUrl: './modification-room.component.scss'
})
export class ModificationRoomComponent {

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
      private router: Router,
      private route: ActivatedRoute // Injectez ActivatedRoute
    ) {}
  
    ngOnInit() {
      const roomId = this.route.snapshot.paramMap.get('id');
      if (roomId) {
        this.roomService.getRoomById(+roomId).subscribe(
          room => {
            this.room = room; 
            // Pré-cocher les cases d'équipement
            this.room.equipments.forEach((equipmentName) => {
              const equipment = this.equipements.find(e => Equipments[e.type] === equipmentName);
              if (equipment) {
                equipment.selected = true;
              }
            });
          },
          error => console.error(error)
        );
      }
    }
    
    onSubmit() {
      this.room.equipments = this.equipements
      .filter(equipment => equipment.selected)
      .map(equipment => Equipments[equipment.type]);
  
      // Appel à RoomService pour enregistrer la salle
      this.roomService.modifyRoom(this.room as Room).subscribe({
        next: (room) => {
          const userConfirmed = window.confirm('Modification réussie ! Cliquez sur OK pour revenir a la liste des salles');
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