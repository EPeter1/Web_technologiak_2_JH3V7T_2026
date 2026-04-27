import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Achievement } from '../models/achievement';

@Injectable({
    providedIn: 'root'
})

export class AchievementService {
    private apiUrl = 'http://localhost:3000/api/achievements';

    constructor(private http: HttpClient) {}

    // CREATE
    createAchievement(achievement: Achievement): Observable<Achievement> {
        return this.http.post<Achievement>(this.apiUrl, achievement);
    }

    // GET ALL
    getAchievements(): Observable<Achievement[]> {
        return this.http.get<Achievement[]>(this.apiUrl);
    }

    // GET BY ID
    getAchievementById(id: string): Observable<Achievement> {
        return this.http.get<Achievement>(`${this.apiUrl}/${id}`);
    }

    // UPDATE
    updateAchievement(id: string, achievement: Partial<Achievement>): Observable<Achievement> {
        return this.http.put<Achievement>(`${this.apiUrl}/${id}`, achievement);
    }

    // DELETE
    deleteAchievement(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
