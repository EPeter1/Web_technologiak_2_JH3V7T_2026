import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';
    private _isLoggedIn = signal(false);

    constructor(private http: HttpClient, private router: Router) {}

    get isLoggedIn() {
        return this._isLoggedIn();
    }

    login(userName: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/login`, {
            userName,
            password
        }).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                this._isLoggedIn.set(true);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        this._isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
