// room-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Room, getEquipmentIcon, getAccessibilityIcon } from '../../room';
import { RoomService } from '../../room.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, RouterModule],
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

      <ng-container matColumnDef="equipements">
      <th mat-header-cell *matHeaderCellDef class="action-cell"> Équipements </th>
        <td mat-cell *matCellDef="let room" >
          <mat-icon *ngFor="let equipment of room.equipements">{{ getEquipmentIcon(equipment) }}</mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef > Actions </th>
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
  displayedColumns: string[] = ['id', 'address', 'telephone', 'capacity', 'accessibility', 'equipements', 'actions'];
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.roomService.getRooms().subscribe(
      rooms => this.rooms = rooms,
      error => console.error(error)
    );
  }

  editRoom(room: Room) {
    // Logique pour l'édition d'une salle
    // Par exemple, naviguer vers un formulaire de modification avec l'ID de la salle
    // this.router.navigate(['/room-edit', room.id]);
  }

  async deleteRoom(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      this.roomService.deleteRoom(id);
      (await this.roomService.getRooms()).subscribe(rooms => {
        this.rooms = rooms; // Mettre à jour la liste après la suppression
      });
    }
  }

  getEquipmentIcon = getEquipmentIcon;
  getAccessibilityIcon = getAccessibilityIcon;
 
}
