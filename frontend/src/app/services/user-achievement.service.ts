import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAchievement } from '../models/user-achievement';

@Injectable({
    providedIn: 'root'
})

export class UserAchievementService {
    private apiUrl = 'http://localhost:3000/api/user-achievements';

    constructor(private http: HttpClient) {}

    // CREATE
    createUserAchievement(ua: UserAchievement): Observable<UserAchievement> {
        return this.http.post<UserAchievement>(this.apiUrl, ua);
    }

    // GET ALL
    getUserAchievements(): Observable<UserAchievement[]> {
        return this.http.get<UserAchievement[]>(this.apiUrl);
    }

    // GET BY ID
    getUserAchievementById(id: string): Observable<UserAchievement> {
        return this.http.get<UserAchievement>(`${this.apiUrl}/${id}`);
    }

    // UPDATE
    updateUserAchievement(id: string, ua: Partial<UserAchievement>): Observable<UserAchievement> {
        return this.http.put<UserAchievement>(`${this.apiUrl}/${id}`, ua);
    }

    // DELETE
    deleteUserAchievement(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
