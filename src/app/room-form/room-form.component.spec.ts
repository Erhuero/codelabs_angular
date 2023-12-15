import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomFormComponent } from './room-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('RoomFormComponent', () => {
  let component: RoomFormComponent;
  let fixture: ComponentFixture<RoomFormComponent>;

  // Configuration initiale avant chaque test
  beforeEach(async () => {
    // Configure l'environnement de test
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, // Importe FormsModule pour les tests de formulaires
        RouterTestingModule, // Importe RouterTestingModule pour les tests de routage
        HttpClientTestingModule, // Importe HttpClientTestingModule pour les tests HTTP
        RouterTestingModule, // Importe à nouveau RouterTestingModule (devrait être supprimé car dupliqué)
        RoomFormComponent // Ajoute RoomFormComponent à la configuration de test
      ],
    }).compileComponents(); // Compile les composants
    
    // Crée une instance de RoomFormComponent pour les tests
    fixture = TestBed.createComponent(RoomFormComponent);
    component = fixture.componentInstance;// Récupère l'instance du composant
    fixture.detectChanges();// Déclenche la détection de changements pour initialiser le composant
  });

  it('should update the value of the address field', () => {
    // Sélectionne les champs de formulaire
    const input1 = fixture.nativeElement.querySelector('#address');
    const input2 = fixture.nativeElement.querySelector('#capacity');
    const input3 = fixture.nativeElement.querySelector('#telephone');
    const input4 = fixture.nativeElement.querySelector('#accessibility');

    // Crée un nouvel événement 'input'
    const event = createNewEvent('input');

    // Modifie les valeurs des champs de formulaire
    input1.value = '123 Rue Royale';
    input2.value = 25;
    input3.value = '+33 181118538';
    input4.value = true;

    // Déclenche l'événement 'input' pour chaque champ
    input1.dispatchEvent(event);
    input2.dispatchEvent(event);
    input3.dispatchEvent(event);
    input4.dispatchEvent(event);

    //vérifie si les propriétés du composant ont étés mis à jour
    expect(component.room.address).toEqual('123 Rue Royale');
    expect(component.room.capacity).toEqual(25);
    expect(component.room.telephone).toEqual('+33 181118538');
    expect(component.room.accessibility).toEqual(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test pour vérifier la mise à jour de l'état des checkboxes
  it('should update the state of checkboxes', () => {
    // Sélectionne les checkboxes
    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
  
    // Simuler des actions sur les checkboxes
    checkboxes.forEach((checkbox: { checked: boolean; dispatchEvent: (arg0: Event) => void; }, index: any) => {
      checkbox.checked = true; //Cocher la checkbox
      checkbox.dispatchEvent(new Event('change')); //Simuler un événement de changement
    });
  
    // Vérifie si la propriété selected de chaque équipement a été mise à jour
    component.equipements.forEach((equipment, index) => {
      expect(equipment.selected).toEqual(true); // Vérifier si la propriété 'selected' est mise à jour
    });
  });

  //Test pour vérifier la mise à jour de l'état de la checkbox accessibility
  it('should update the state of the accessibility checkbox', () => {
    //selectionne la checkbox accessiblity
    const checkbox = fixture.nativeElement.querySelector('#accessibility');
    checkbox.checked = true;//coche la checkbox
    checkbox.dispatchEvent(new Event('change'));//declenche l'évenement change
    fixture.detectChanges();// Déclenche la détection de changements
  
    //Vérifie si la propriété accessibility du composant a été mise à jour 
    expect(component.room.accessibility).toBe(true);//Vérifie si accesibilité est vraie
  });
});

//fonction pour créer un nouvel évenement
function createNewEvent(eventName: string) {
  //Crée un nouvel évenment en fonction du support du navigateur
  if (typeof(Event) === 'function'){
    return new Event(eventName);
  } else {
    const event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    return event;
  }
}
