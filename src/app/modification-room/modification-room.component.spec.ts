import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationRoomComponent } from './modification-room.component';

describe('ModificationRoomComponent', () => {
  let component: ModificationRoomComponent;
  let fixture: ComponentFixture<ModificationRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
