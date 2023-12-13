import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Room } from '../../room';
import { HttpClient } from '@angular/common/http';
import { GestionErreurPipe } from '../pipes/gestion-erreur.pipe';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private gestionErreurPipe = new GestionErreurPipe();

  private apiUrl = '/api/rooms';
  erreurHandlePipe: any;
  
  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl).pipe(catchError(this.gestionErreurPipe.transform));
  }

  // Ajoute une nouvelle salle
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room).pipe(catchError(this.gestionErreurPipe.transform));
  }

  modifyRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${room.id}`, room).pipe(catchError(this.gestionErreurPipe.transform));
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`).pipe(catchError(this.gestionErreurPipe.transform));
  }

  // Supprime une salle
  deleteRoom(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`)
    .pipe(map(() => ({ message: 'Salle supprimée avec succès.' })),catchError(this.erreurHandlePipe.transform)
      );
  }
}
