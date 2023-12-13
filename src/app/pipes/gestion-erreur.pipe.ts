import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { throwError } from 'rxjs';

@Pipe({
  name: 'gestionErreur',
  standalone: true
})
export class GestionErreurPipe implements PipeTransform {

  transform(value: any){
    return this.handleError(value);
    
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue s\'est produite!';
    if (error.error && typeof error.error.message === 'string') {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Statut: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
