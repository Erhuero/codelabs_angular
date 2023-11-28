// room.service.ts
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { Room } from './room';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = '/api/rooms';

   // Gestion des erreurs
   private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue s\'est produite!';
    if (error.error && typeof error.error.message === 'string') {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Statut: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
  constructor(private http: HttpClient, private loginService: LoginService) {
    
  }

  getRooms(): Observable<Room[]> {
    //console.log("Window", window)
    // Récupérer le token du stockage local
    const token = this.loginService.token;
    // Créer les en-têtes HTTP avec le token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Passer les en-têtes à la requête GET
    return this.http.get<Room[]>(this.apiUrl, { headers });
  }

  
  // Ajoute une nouvelle salle

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room).pipe(catchError(this.handleError));
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
