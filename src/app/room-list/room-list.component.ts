// room-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Room } from '../../../room';
import { RoomService } from '../../../room.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
  <h2>Administration des salles</h2>
    <table mat-table [dataSource]="rooms" class="mat-elevation-z8">
    <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let room">{{ room.id }}</td>
      </ng-container>

      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef> Adresse </th>
        <td mat-cell *matCellDef="let room">{{ room.address }}</td>
      </ng-container>

      <ng-container matColumnDef="telephone">
        <th mat-header-cell *matHeaderCellDef> Telephone </th>
        <td mat-cell *matCellDef="let room">{{ room.telephone }}</td>
      </ng-container>

     <ng-container matColumnDef="capacity">
        <th mat-header-cell *matHeaderCellDef> Capacité  </th>
        <td mat-cell *matCellDef="let room">{{ room.capacity }}</td>
      </ng-container>

      <ng-container matColumnDef="accessibility">
        <th mat-header-cell *matHeaderCellDef> Accessiblité </th>
        <td mat-cell *matCellDef="let room">{{ room.accessibility }}</td>
      </ng-container>

      <ng-container matColumnDef="equipements">
        <th mat-header-cell *matHeaderCellDef> Equipements </th>
        <td mat-cell *matCellDef="let room">{{ room.equipements }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let room">
        <button mat-icon-button (click)="editRoom(room)">
          <mat-icon>Editer</mat-icon>
        </button>
        <button mat-icon-button (click)="deleteRoom(room.id)">
          <mat-icon>Supprimer</mat-icon>
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
  rooms: Room[] = []; // Initialisation avec un tableau vide

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }

  editRoom(room: Room) {
    // Logique pour l'édition d'une salle
    // Par exemple, naviguer vers un formulaire de modification avec l'ID de la salle
    // this.router.navigate(['/room-edit', room.id]);
  }

  deleteRoom(id: number) {
    // Logique pour la suppression d'une salle
    // Confirmer la suppression, puis appeler la méthode de service pour supprimer la salle
    if(confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      this.roomService.deleteRoom(id);
      this.rooms = this.roomService.getRooms(); // Actualisez la liste après la suppression
    }
  }

}
