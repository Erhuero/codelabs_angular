import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomListComponent } from './room-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RoomService } from '../services/room.service';

describe('RoomListComponent', () => {
  let component: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;
  let mockRoomService: any;

  beforeEach(async () => {

    mockRoomService = {
      getRooms: jest.fn()
    }

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterTestingModule,
        RoomListComponent
      ],
      providers: [
        { provide: RoomService, useValue: mockRoomService}
      ]
    }).compileComponents();

    mockRoomService.getRooms.mockReturnValue(of([{id: 1, address: '123 Rue Royale', accessibility: true, equipments: ['VISIO']}]));
    
    fixture = TestBed.createComponent(RoomListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rooms from the service', async () => {
    fixture.detectChanges(); // Déclenche ngOnInit
    await fixture.whenStable(); // Attend que les observables soient résolus

    expect(component.rooms).toEqual([{id: 1, address: '123 Rue Royale', accessibility: true, equipments: ['VISIO']}]);
  });
});
