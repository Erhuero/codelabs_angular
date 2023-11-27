import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { getEquipmentIcon, getAccessibilityIcon, Equipements } from '../../room';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-creation-room',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  template: `
    <div class="creation-room-container">
      <h2>Créer une nouvelle salle</h2>
      <form>
        <div class="form-field">
          <label for="address">Adresse</label>
          <input id="address" type="text" placeholder="Adresse" />
        </div>
        
        <div class="form-field">
          <label for="capacity">Effectif</label>
         
        </div>
            
        <div class="form-field">
          <label for="phone">Téléphone</label>
          <input id="phone" type="tel" placeholder="Téléphone" />
        </div>
        
        <div class="form-field">
          <label for="accessibility">Accessible Handicapé ?</label>
          <input id="accessibility" type="checkbox" />
        </div>
        
        <div class="form-field">
          <label>Équipements</label>
            <div *ngFor="let equipment of equipements">
              
            </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button">Annuler</button>
          <button type="submit" class="submit-button">Enregistrer</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./creation-room.component.scss']
})
export class CreationRoomComponent {
  equipements = [Equipements.TABLE, Equipements.VISIO]; // Exemple d'équipements disponibles
  accessibility = true; // Exemple d'état d'accessibilité

  getEquipmentIcon = getEquipmentIcon;
  getAccessibilityIcon = getAccessibilityIcon;
}
