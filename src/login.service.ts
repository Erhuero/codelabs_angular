// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
// Interface définissant la structure des données de réponse attendues après la connexion
interface LoginData {
    token: string;
}

// Le service Injectable pour gérer les opérations de connexion
@Injectable({
    providedIn: 'root' // Indique que ce service est disponible dans toute l'application
})
export class LoginService {
    private apiUrl = '/api/auth/login'; // URL de l'API d'authentification

    token = ''; // Variable pour stocker le token JWT

    // Constructeur avec injection du service HttpClient pour effectuer des requêtes HTTP
    constructor(private http: HttpClient) { }

    // Méthode pour se connecter avec email et mot de passe
    login(email: string, password: string): Observable<LoginData> {
        // Envoi de la requête POST à l'API d'authentification
        return this.http.post<LoginData>(this.apiUrl, { email, password }).pipe(map(
            (data) => {
                this.token = data.token; // Stockage du token JWT dans la variable
                // Utiliser localStorage.setItem('token', data.token); pour le stocker de manière persistante
                return data; // Retourne les données de réponse
            })
        );
    }

}
