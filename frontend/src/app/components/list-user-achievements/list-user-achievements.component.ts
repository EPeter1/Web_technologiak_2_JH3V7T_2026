import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        DataTableComponent
    ],
    templateUrl: '../list-achievements/list-achievements.component.html',
    styleUrls: ['../list-achievements/list-achievements.component.css']
})

export class ListUserAchievementsComponent extends ListDataDirective<UserAchievement> {
    private datePipe = inject(DatePipe);
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private userAchievementService = inject(UserAchievementService);

    columns = [
        { key: 'user', label: 'User', value: (userAchievement: UserAchievement) => userAchievement.userId?.userName },
        { key: 'achievement', label: 'Achievement', value: (userAchievement: UserAchievement) => userAchievement.achievementId?.name },
        { key: 'platform', label: 'Platform', value: (userAchievement: UserAchievement) => userAchievement.platform },
        {
            key: 'unlocked',
            label: 'Unlocked',
            value: (userAchievement: UserAchievement) => this.datePipe.transform(userAchievement.unlockedAt, 'yyyy.MM.dd. HH:mm:ss')
        }
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

        const dialogReference = ConfirmDialogComponent.open(
            this.dialog,
            `${userAchievement.achievementId?.name} for ${userAchievement.userId?.userName}`
        );

        dialogReference.afterClosed().subscribe((confirmed) => {
            if (confirmed === true) {
                this.userAchievementService.deleteUserAchievement(userAchievement._id!).subscribe(() => {
                    this.refresh();
                });
            }
        });
    }

    filterItem(userAchievement: UserAchievement, term: string): boolean {
        return userAchievement.userId?.userName?.toLowerCase().includes(term) ||
            userAchievement.achievementId?.name?.toLowerCase().includes(term) ||
            userAchievement.platform?.toLowerCase().includes(term);
    }
}
