import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-titre',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      titre works!
    </p>
  `,
  styleUrl: './titre.component.scss'
})
export class TitreComponent {

}
