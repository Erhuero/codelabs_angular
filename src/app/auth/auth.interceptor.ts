import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = 
(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    // Récupérer le token du stockage local
    const token = localStorage.getItem('token');

    //info : intercepteur fonctionnel

    //intercepter le token de login service

    // Si le token existe, cloner la requête et ajouter le token d'authentification
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    // Passer la requête modifiée au prochain handler
    return next(authReq);
}