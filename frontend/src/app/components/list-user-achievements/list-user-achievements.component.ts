import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { DataTableComponent } from '../data-table/data-table.component';
import { ListDataDirective } from '../../directives/list-data/list-data.directive';
import { UserAchievement } from '../../models/user-achievement';
import { UserAchievementService } from '../../services/user-achievement.service';

@Component({
    selector: 'app-list-user-achievements',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        DataTableComponent
    ],
    templateUrl: '../list-achievements/list-achievements.component.html',
    styleUrls: ['./list-user-achievements.component.css']
})

export class ListUserAchievementsComponent extends ListDataDirective<UserAchievement> {
    private router = inject(Router);
    private userAchievementService = inject(UserAchievementService);

    columns = [
        { label: 'User', value: (userAchievement: UserAchievement) => userAchievement.userId?.userName },
        { label: 'Achievement', value: (userAchievement: UserAchievement) => userAchievement.achievementId?.name },
        { label: 'Platform', value: (userAchievement: UserAchievement) => userAchievement.platform },
        { label: 'Unlocked', value: (userAchievement: UserAchievement) => userAchievement.unlockedAt }
    ];

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
