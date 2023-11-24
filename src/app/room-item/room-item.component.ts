import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../room';

@Component({
  selector: 'app-room-item',
  standalone: true,
  imports: [CommonModule],
  template: `
     <div>
      <h3>{{ room.address }}</h3>
    </div>
  `,
  styleUrl: './room-item.component.scss'
})
export class RoomItemComponent {
  @Input() room!: Room;
}
