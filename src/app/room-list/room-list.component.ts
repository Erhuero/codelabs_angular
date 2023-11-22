// room-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Room, Equipements } from '../../../room';
import { RoomService } from '../../../room.service';


@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [MatTableModule],
  template: `
    <table mat-table [dataSource]="rooms" class="mat-elevation-z8">
    <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let room">{{ room.id }}</td>
      </ng-container>

     <ng-container matColumnDef="capacity">
        <th mat-header-cell *matHeaderCellDef> Capacity </th>
        <td mat-cell *matCellDef="let room">{{ room.capacity }}</td>
      </ng-container>

      <ng-container matColumnDef="accessibility">
        <th mat-header-cell *matHeaderCellDef> Accessibility </th>
        <td mat-cell *matCellDef="let room">{{ room.accessibility }}</td>
      </ng-container>

      <ng-container matColumnDef="equipements">
        <th mat-header-cell *matHeaderCellDef> Equipements </th>
        <td mat-cell *matCellDef="let room">{{ room.equipements }}</td>
      </ng-container>

      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef> Address </th>
        <td mat-cell *matCellDef="let room">{{ room.address }}</td>
      </ng-container>

      <ng-container matColumnDef="telephone">
        <th mat-header-cell *matHeaderCellDef> Telephone </th>
        <td mat-cell *matCellDef="let room">{{ room.telephone }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let room; columns: displayedColumns;"></tr>
    </table>
  `,
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'address', 'capacity', 'accessibility', 'equipements', 'telephone'];
  rooms: Room[] = []; // Initialisation avec un tableau vide

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }
}
