import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-creation-room',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      creation-room works!
    </p>
  `,
  styleUrl: './creation-room.component.scss'
})
export class CreationRoomComponent {}