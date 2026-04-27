import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Achievement } from '../../models/achievement';
import { AchievementService } from '../../services/achievement.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { ListDataComponent } from '../list-data/list-data.component';

@Component({
    selector: 'app-list-achievements',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DataTableComponent,
    ],
    templateUrl: './list-achievements.component.html',
    styleUrls: ['./list-achievements.component.css']
})

export class ListAchievementsComponent extends ListDataComponent<Achievement> {
    columns = [
        { label: 'Game', value: (a: Achievement) => a.game },
        { label: 'Achievement', value: (a: Achievement) => a.name },
        { label: 'Condition', value: (a: Achievement) => a.condition },
        { label: 'Difficulty', value: (a: Achievement) => a.difficulty }
    ];

    constructor(private achievementService: AchievementService) {
        super();
    }

    loadItems(): Observable<Achievement[]> {
        return this.achievementService.getAchievements();
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
