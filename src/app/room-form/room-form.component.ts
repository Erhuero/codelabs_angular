import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipments, Room, getAccessibilityIcon, getEquipmentIcon } from '../../room';
import { RoomService } from '../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface EquipmentWithState {
  type: Equipments;
  selected: boolean;
}

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="room-form-container">
      <h2>{{ isEditMode ? 'Modifier la salle' : 'Créer une nouvelle salle' }}</h2>
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
          <div class="checkbox-label-container">
            <input id="accessibility" type="checkbox" [(ngModel)]="room.accessibility" [ngModelOptions]="{standalone: true}">
            <label for="accessibility">Accessible Handicapé ?</label>
          </div>
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
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent {

  
  room: Omit<Room, 'id'> = {
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
  isEditMode: boolean = false;
  roomForm: any;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router
  ) {}

  @Input() roomId?: number;

  ngOnInit() {
    console.log(this.roomId);
    
    if (this.roomId != null && !isNaN(this.roomId)) {
      this.isEditMode = true;
      this.roomService.getRoomById(this.roomId).subscribe(
        room => {
          this.room = room;
          this.room.equipments.forEach((equipmentName) => {
            const equipment = this.equipements.find(e => Equipments[e.type] === equipmentName);
            if (equipment) {
              equipment.selected = true;
            }
          });
        },
        error => console.error(error)
      );
    } else {
      this.isEditMode = false;
      console.log('Mode création, aucun ID de salle fourni.');
    }
  }

  onSubmit() {
    this.room.equipments = this.equipements
      .filter(equipment => equipment.selected)
      .map(equipment => Equipments[equipment.type]);

    if (this.isEditMode) {
      this.roomService.modifyRoom(this.room as Room).subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error)
      });
    } else {
      this.roomService.addRoom(this.room as Room).subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error)
      });
    }
  }

  handleSuccess() {
    const message = this.isEditMode ? 'Modification réussie !' : 'Enregistrement réussi !';
    const userConfirmed = window.confirm(`${message} Cliquez sur OK pour revenir à la liste des salles.`);
    if (userConfirmed) {
      this.router.navigate(['/room']);
    }
  }

  onCancel() {
    const userConfirmed = window.confirm('Êtes-vous sûr de vouloir annuler ?');
    if (userConfirmed) {
      this.router.navigate(['/room']);
    }
  }

  handleError(error: any) {
    window.alert('Échec de l\'opération: ' + error);
  }

  getIcon(equipment: Equipments): string {
    // Utilisez la fonction existante getEquipmentIcon avec la conversion nécessaire
    return getEquipmentIcon(Equipments[equipment]);
  }
}
