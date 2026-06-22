import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

import { createUserAchievementForm, PLATFORMS } from '../user-achievement-form.config';
import { DataFormComponent } from '../data-form/data-form.component';
import { FormErrorComponent } from '../form-error/form-error.component';
import { ManageDataDirective } from '../../directives/manage-data/manage-data.directive';
import { Achievement } from '../../models/achievement';
import { User } from '../../models/user';
import { AchievementService } from '../../services/achievement.service';
import { NotificationService } from '../../services/notification.service';
import { UserAchievementService } from '../../services/user-achievement.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-edit-user-achievement',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        DataFormComponent,
        FormErrorComponent
    ],
    templateUrl: '../add-user-achievement/add-user-achievement.component.html',
    styleUrls: ['../add-achievement/add-achievement.component.css']
})

export class EditUserAchievementComponent extends ManageDataDirective implements OnChanges, OnInit {
    private achievementService = inject(AchievementService);
    private notificationService = inject(NotificationService);
    private userAchievementService = inject(UserAchievementService);
    private userService = inject(UserService);

    @Input() editId!: string;

    title = 'Edit User Achievement';
    submitButtonText = 'Update';
    dataForm = createUserAchievementForm();

    platforms = PLATFORMS;

    users$!: Observable<User[]>;
    achievements$!: Observable<Achievement[]>;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['editId'] && this.editId) {
            this.loadUserAchievements();
        }
    }

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
        this.achievements$ = this.achievementService.getAchievements();
    }

    executeSubmit(): void {
        if (this.dataForm.pristine) {
            this.notificationService.showSnack('No changes detected', 'error');
            return;
        }

        const formValues = this.dataForm.getRawValue();
        let date: Date | undefined = undefined;

        if (formValues.unlockedDate) {
            date = new Date(formValues.unlockedDate);
            const timeString = formValues.unlockedTime || '00:00:00';
            const [hours, minutes, seconds] = timeString.split(':').map(Number);

            date.setHours(hours, minutes, seconds || 0, 0);
        }

        const updatedUserAchievement: any = {
            userId: formValues.userId,
            achievementId: formValues.achievementId,
            platform: formValues.platform,
            unlockedAt: date
        };

        this.userAchievementService.updateUserAchievement(this.editId, updatedUserAchievement).subscribe({
            next: () => {
                this.notificationService.showSnack('User achievement updated successfully', 'success')
            },
            error: (error) => {
                this.notificationService.showSnack('Update error: ' + error.message, 'error')
            }
        });
    }

    private loadUserAchievements(): void {
        this.userAchievementService.getUserAchievementById(this.editId).subscribe({
            next: (userAchievement) => {
                let date: Date | null = null;
                let time = '';

                if (userAchievement.unlockedAt) {
                    date = new Date(userAchievement.unlockedAt);
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');

                    time = `${hours}:${minutes}:${seconds}`;
                }

                const uId = typeof userAchievement.userId === 'object' ? userAchievement.userId?._id : userAchievement.userId;
                const aId = typeof userAchievement.achievementId === 'object' ? userAchievement.achievementId?._id : userAchievement.achievementId;

                this.dataForm.patchValue({
                    userId: uId,
                    achievementId: aId,
                    platform: userAchievement.platform,
                    unlockedDate: date,
                    unlockedTime: time
                });
            },
            error: () => this.notificationService.showSnack('Failed to load user achievement', 'error')
        });
    }
}
