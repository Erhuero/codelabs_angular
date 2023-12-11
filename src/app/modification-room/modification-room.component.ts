import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipments, Room, getAccessibilityIcon, getEquipmentIcon } from '../../room';
import { EquipmentWithState } from '../creation-room/creation-room.component';
import { RoomService } from '../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modification-room',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="creation-room-container">
      <h2>Modifier la salle</h2>
      <form [formGroup]="roomForm" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label for="address">Adresse</label>
          <input id="address" type="text" placeholder="Adresse" formControlName="address"/>
        </div>

        <div class="form-field">
          <label for="capacity">Effectif</label>
          <input id="capacity" type="number" placeholder="Entrez un nombre" formControlName="capacity"/>
        </div>

        <div class="form-field">
          <label for="telephone">Téléphone</label>
          <input id="telephone" type="telephone" placeholder="Téléphone" formControlName="telephone"/>
        </div>

        <div class="form-field">
          <div class="checkbox-label-container">
            <input id="accessibility" type="checkbox" formControlName="accessibility">
            <label for="accessibility">Accessible Handicapé ?</label>
          </div>
        </div>

        <div class="form-field equipment-checkboxes">
          <label>Équipements:</label>
          <div *ngFor="let equipment of equipements; let i = index" class="equipment-checkbox">
            <input type="checkbox" [id]="'equipment' + i" formControlName="equipments">
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

  roomForm : FormGroup;

    equipements: EquipmentWithState[] = [
      { type: Equipments.TABLE, selected: false },
      { type: Equipments.VISIO, selected: false }
    ];
    accessibility = true;

    constructor(
      private fb: FormBuilder,
      private roomService: RoomService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.roomForm = this.fb.group({
        address: ['', Validators.required],
        capacity: ['', Validators.required],
        telephone: [''],
        accessibility: [false],
        equipments: this.fb.array(this.equipements.map(() => this.fb.control(false)))
      });
    }
  
  
    ngOnInit() {
      const roomId = this.route.snapshot.paramMap.get('id');
      if (roomId) {
        this.roomService.getRoomById(+roomId).subscribe(room => {
          this.roomForm.patchValue({
            address: room.address,
            capacity: room.capacity,
            telephone: room.telephone,
            accessibility: room.accessibility
            // Vous devez gérer également la mise à jour des équipements
          });
          // Gérer la logique pour cocher les cases des équipements
        });
      }
    }
    
    onSubmit() {
      if (this.roomForm.valid) {
        const formValue = this.roomForm.value;
        // Traitez les données du formulaire ici
      }
    }  

    onCancel() {
      const userConfirmed = window.confirm('Êtes-vous sûr de vouloir annuler ?');
      if (userConfirmed) {
        this.router.navigate(['/room']);
      }
    }

    getEquipmentIcon = getEquipmentIcon;
    getAccessibilityIcon = getAccessibilityIcon;

    getIcon(equipment: Equipments): string {
      // Utilisez la fonction existante getEquipmentIcon avec la conversion nécessaire
      return getEquipmentIcon(Equipments[equipment]);
    }

}
