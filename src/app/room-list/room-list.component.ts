// room-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Room, getEquipmentIcon, getAccessibilityIcon } from '../../room';
import { RoomService } from '../services/room.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list', // Définit le sélecteur personnalisé pour utiliser ce composant dans d'autres templates HTML.
  standalone: true,         // Indique que le composant est autonome (standalone) et peut être utilisé sans être déclaré dans un module.
  imports: [                // Liste des modules nécessaires pour ce composant.
    MatTableModule,         // Importe MatTableModule pour l'utilisation de tables Material Design.
    MatIconModule,          // Importe MatIconModule pour l'utilisation d'icônes Material Design.
    CommonModule,           // Importe CommonModule qui offre les directives Angular courantes comme ngIf, ngFor.
    RouterLink         
  ],
  template: `
  <h2>Administration des salles</h2>
  
  <button mat-fab color="primary" [routerLink]="['/room/create']" class="fab-button">
      <mat-icon>add</mat-icon>
    </button>

    <table mat-table [dataSource]="rooms" class="mat-elevation-z8">
    <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let room" >{{ room.id }}</td>
      </ng-container>

      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef> Adresse </th>
        <td mat-cell *matCellDef="let room" class="action-cell">{{ room.address }}</td>
      </ng-container>

      <ng-container matColumnDef="telephone">
        <th mat-header-cell *matHeaderCellDef> Telephone </th>
        <td mat-cell *matCellDef="let room" class="action-cell">{{ room.telephone }}</td>
      </ng-container>

     <ng-container matColumnDef="capacity">
        <th mat-header-cell *matHeaderCellDef class="action-cell"> Capacité  </th>
        <td mat-cell *matCellDef="let room">{{ room.capacity }}</td>
      </ng-container>

      <ng-container matColumnDef="accessibility">
        <th mat-header-cell *matHeaderCellDef class="action-cell"> Accessibilité </th>
          <td mat-cell *matCellDef="let room">
            <mat-icon *ngIf="room.accessibility">{{ getAccessibilityIcon(room.accessibility) }}</mat-icon>
          </td>
      </ng-container>

      <ng-container matColumnDef="equipments">
      <th mat-header-cell *matHeaderCellDef class="action-cell"> Équipements </th>
        <td mat-cell *matCellDef="let room">
          <mat-icon *ngFor="let equipment of room.equipments">{{ getEquipmentIcon(equipment) }}</mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let room" class="action-cell">
          <button mat-icon-button (click)="editRoom(room)" style="margin-right: 8px;">
            <mat-icon>edit</mat-icon> 
          </button>
          <button mat-icon-button (click)="deleteRoom(room.id)">
            <mat-icon>delete</mat-icon>
        </button>
        </td>
      </ng-container>
     
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let room; columns: displayedColumns;"></tr>
    </table>
  `,
  styleUrl: './room-list.component.scss'
})

export class RoomListComponent implements OnInit {
  // Définit les colonnes à afficher dans le tableau des salles
  displayedColumns: string[] = ['id', 'address', 'telephone', 'capacity', 'accessibility', 'equipments', 'actions'];
  // Stocke la liste des salles récupérées depuis l'API
  rooms: Room[] = [];

  // Injecte RoomService pour la gestion des salles et Router pour la navigation
  constructor(private roomService: RoomService, private router: Router) {}

  // Charge les salles au démarrage du composant
  ngOnInit() {
    // Appelle getRooms de RoomService et met à jour la liste des salles
    this.roomService.getRooms().subscribe(
      rooms => this.rooms = rooms, // Stocke les salles dans la variable rooms
      error => console.error(error)  // Affiche les erreurs en console
    );
  }

  // Méthode pour éditer une salle spécifique
  editRoom(room: Room) {
    // Navigue vers la page de modification de la salle avec l'ID de la salle
    this.router.navigate(['/room', room.id]);
  }

  // Méthode pour supprimer une salle spécifique
  async deleteRoom(id: number) {
    // Demande une confirmation avant la suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      // Appelle deleteRoom de RoomService pour supprimer la salle
      this.roomService.deleteRoom(id).subscribe(async () => {
        // Recharge la liste des salles après la suppression
        (await this.roomService.getRooms()).subscribe(rooms => {
          this.rooms = rooms; // Met à jour la liste des salles
        });
      });
    }
  }
  
  // Méthodes pour obtenir les icônes d'équipement et d'accessibilité
  getEquipmentIcon = getEquipmentIcon;
  getAccessibilityIcon = getAccessibilityIcon;
}

