// room.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { Room, Equipements } from './room';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://localhost:3000/rooms';

   // Gestion des erreurs
   private handleError(error: HttpErrorResponse) {
    // Vous pouvez traiter l'erreur en fonction de son statut ou de son contenu
    let errorMessage = 'Une erreur inconnue s\'est produite!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Statut: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  constructor(private http: HttpClient) {}
  
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError),
        shareReplay(1) // Cache la dernière valeur pour les souscriptions ultérieures
      );
  }
  
  // Ajoute une nouvelle salle

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room)
      .pipe(catchError(this.handleError));
  }

  updateRoom(updatedRoom: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${updatedRoom.id}`, updatedRoom)
      .pipe(catchError(this.handleError));
  }
//retourner un observable de room (gagne de temps)
//creer le routing avec un menu

  // Supprime une salle
  deleteRoom(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(
        map(() => ({ message: 'Salle supprimée avec succès.' })),
        catchError(this.handleError)
      );
  }
  


}
