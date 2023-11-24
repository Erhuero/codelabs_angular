import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRoomComponent } from './creation-room.component';

describe('CreationRoomComponent', () => {
  let component: CreationRoomComponent;
  let fixture: ComponentFixture<CreationRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
