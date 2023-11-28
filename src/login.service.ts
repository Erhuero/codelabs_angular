// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

interface LoginData {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl = '/api/auth/login';

    token = '';
//perte de mémoire, utiliser le localStorage
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginData> {
        return this.http.post<LoginData>(this.apiUrl, { email, password }).pipe(map(
            (data) => {
                this.token = data.token;
                return data;
            })
        );
    }

}
