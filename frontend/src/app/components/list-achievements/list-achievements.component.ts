import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { DataTableComponent } from '../data-table/data-table.component';
import { ListDataDirective } from '../../directives/list-data/list-data.directive';
import { Achievement } from '../../models/achievement';
import { AchievementService } from '../../services/achievement.service';

@Component({
    selector: 'app-list-achievements',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        DataTableComponent
    ],
    templateUrl: './list-achievements.component.html',
    styleUrls: ['./list-achievements.component.css']
})

export class ListAchievementsComponent extends ListDataDirective<Achievement> {
    private router = inject(Router);
    private achievementService = inject(AchievementService);

    columns = [
        { key: 'user', label: 'Game', value: (achievement: Achievement) => achievement.game },
        { key: 'achievement', label: 'Achievement', value: (achievement: Achievement) => achievement.name },
        { key: 'condition', label: 'Condition', value: (achievement: Achievement) => achievement.condition },
        { key: 'difficulty', label: 'Difficulty', value: (achievement: Achievement) => achievement.difficulty }
    ];

    loadItems(): Observable<Achievement[]> {
        return this.achievementService.getAchievements();
    }

    editItem(achievement: Achievement): void {
        if (achievement._id) {
            this.router.navigate(['/edit', 'achievements', achievement._id]);
        }
    }

    deleteItem(achievement: Achievement): void {
        if (!achievement._id) {
            return;
        }
        
        if (confirm('Delete achievement?')) {
            this.achievementService.deleteAchievement(achievement._id).subscribe(() => {
                this.refresh();
            });
        }
    }

    filterItem(achievement: Achievement, term: string): boolean {
        return achievement.game.toLowerCase().includes(term) ||
            achievement.name.toLowerCase().includes(term);
    }
}
