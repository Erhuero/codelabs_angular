import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomFormComponent } from './room-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('RoomFormComponent', () => {
  let component: RoomFormComponent;
  let fixture: ComponentFixture<RoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule, 
        HttpClientTestingModule,
        RouterTestingModule,
        RoomFormComponent
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(RoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update the value of the address field', () => {
    const input1 = fixture.nativeElement.querySelector('#address');
    const input2 = fixture.nativeElement.querySelector('#capacity');
    const input3 = fixture.nativeElement.querySelector('#telephone');
    const input4 = fixture.nativeElement.querySelector('#accessibility');

    const event = createNewEvent('input');

    input1.value = '123 Rue Royale';
    input2.value = 25;
    input3.value = '+33 181118538';
    input4.value = true;

    input1.dispatchEvent(event);
    input2.dispatchEvent(event);
    input3.dispatchEvent(event);
    input4.dispatchEvent(event);

    expect(component.room.address).toEqual('123 Rue Royale');
    expect(component.room.capacity).toEqual(25);
    expect(component.room.telephone).toEqual('+33 181118538');
    expect(component.room.accessibility).toEqual(false);

  });

  it('should update the state of checkboxes', () => {
    // Sélectionner les checkboxes
    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
  
    // Simuler des actions sur les checkboxes
    checkboxes.forEach((checkbox: { checked: boolean; dispatchEvent: (arg0: Event) => void; }, index: any) => {
      checkbox.checked = true; // Cocher la checkbox
      checkbox.dispatchEvent(new Event('change')); // Simuler un événement de changement
    });
  
    // Vérifier les valeurs
    component.equipements.forEach((equipment, index) => {
      expect(equipment.selected).toEqual(true); // Vérifier si la propriété 'selected' est mise à jour
    });
  });
});

function createNewEvent(eventName: string) {
  if (typeof(Event) === 'function'){
    return new Event(eventName);
  } else {
    const event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    return event;
  }
}
