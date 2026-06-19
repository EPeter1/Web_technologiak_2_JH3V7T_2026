import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserAchievement } from '../../models/user-achievement';
import { UserAchievementService } from '../../services/user-achievement.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { ListDataComponent } from '../list-data/list-data.component';

@Component({
    selector: 'app-list-user-achievements',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DataTableComponent
    ],
    templateUrl: './list-user-achievements.component.html',
    styleUrls: ['./list-user-achievements.component.css']
})

export class ListUserAchievementsComponent extends ListDataComponent<UserAchievement> {
    private router = inject(Router);

    columns = [
        { label: 'User', value: (ua: UserAchievement) => ua.userId?.userName },
        { label: 'Achievement', value: (ua: UserAchievement) => ua.achievementId?.name },
        { label: 'Platform', value: (ua: UserAchievement) => ua.platform },
        { label: 'Unlocked', value: (ua: UserAchievement) => ua.unlockedAt }
    ];

    constructor(private userAchievementService: UserAchievementService) {
        super();
    }

    loadItems(): Observable<UserAchievement[]> {
        return this.userAchievementService.getUserAchievements()
    }

    editItem(userAchievement: UserAchievement): void {
        if (userAchievement._id) {
            this.router.navigate(['/edit', 'userAchievements', userAchievement._id]);
        }
    }

    deleteItem(userAchievement: UserAchievement): void {
        if (!userAchievement._id) {
            return;
        }

        if (confirm('Delete user achievement?')) {
            this.userAchievementService.deleteUserAchievement(userAchievement._id).subscribe(() => {
                this.refresh();
            });
        }
    }

    filterItem(ua: UserAchievement, term: string): boolean {
        return ua.userId?.userName?.toLowerCase().includes(term) ||
            ua.achievementId?.name?.toLowerCase().includes(term) ||
            ua.platform?.toLowerCase().includes(term);
    }
}
