import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
    selector: 'app-add-user-achievement',
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
    templateUrl: './add-user-achievement.component.html',
    styleUrls: ['../add-achievement/add-achievement.component.css']
})

export class AddUserAchievementComponent extends ManageDataDirective implements OnInit {
    private achievementService = inject(AchievementService);
    private notificationService = inject(NotificationService);
    private userAchievementService = inject(UserAchievementService);
    private userService = inject(UserService);

    title = 'Add User Achievement';
    submitButtonText = 'Add';
    dataForm = createUserAchievementForm();

    platforms = PLATFORMS;

    users$!: Observable<User[]>;
    achievements$!: Observable<Achievement[]>;

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
        this.achievements$ = this.achievementService.getAchievements();
    }

    executeSubmit(): void {
        const formValues = this.dataForm.getRawValue();

        this.userAchievementService.getUserAchievements().subscribe(list => {
            const exists = list.some(userAchievement =>
                userAchievement.userId?._id === formValues.userId &&
                userAchievement.achievementId?._id === formValues.achievementId
            );

            if (exists) {
                this.notificationService.showSnack('This user already has this achievement unlocked', 'error');
                return;
            }

            let date: Date | undefined = undefined;

            if (formValues.unlockedDate) {
                date = new Date(formValues.unlockedDate);
                const timeString = formValues.unlockedTime || '00:00:00';
                const [hours, minutes, seconds] = timeString.split(':').map(Number);

                date.setHours(hours, minutes, seconds || 0, 0);
            }

            const newUserAchievement: any = {
                userId: formValues.userId,
                achievementId: formValues.achievementId,
                platform: formValues.platform,
                unlockedAt: date
            };

            this.userAchievementService.createUserAchievement(newUserAchievement).subscribe({
                next: () => {
                    this.dataForm.reset({
                        platform: 'PC', 
                        unlockedDate: null,
                        unlockedTime: ''
                    });
                    this.notificationService.showSnack('User achievement added successfully', 'success');
                },
                error: (error) => {
                    this.notificationService.showSnack('Error while saving: ' + error.message, 'error');
                }
            });
        });
    }
}
