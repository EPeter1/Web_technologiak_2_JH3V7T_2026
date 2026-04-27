import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) {}

    // CREATE
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    // GET ALL
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    // GET BY ID
    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    // UPDATE
    updateUser(id: string, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }

    // DELETE
    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
