import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Observable } from 'rxjs';
import { Achievement } from '../../models/achievement';
import { User } from '../../models/user';
import { AchievementService } from '../../services/achievement.service';
import { UserAchievementService } from '../../services/user-achievement.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-add-user-achievement',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './add-user-achievement.component.html',
    styleUrls: ['../add-styles.css']
})

export class AddUserAchievementComponent implements OnInit {
    userAchievementForm: FormGroup;
    platforms = ['PC', 'Playstation', 'Xbox', 'Switch'];

    users$!: Observable<User[]>;
    achievements$!: Observable<Achievement[]>;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private achievementService: AchievementService,
        private userAchievementService: UserAchievementService,
        private notification: NotificationService
    )
    {
        this.userAchievementForm = this.fb.group({
            userId: ['', Validators.required],
            achievementId: ['', Validators.required],
            platform: ['PC', Validators.required],
            unlockedDate: [new Date(), Validators.required],
            unlockedTime: ['12:00', Validators.required]
        });
    }

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
        this.achievements$ = this.achievementService.getAchievements();
    }

    onSubmit() {
        if (this.userAchievementForm.invalid) {
            return;
        }

        const FormValues = this.userAchievementForm.value;

        this.userAchievementService.getUserAchievements().subscribe(list => {
            const exists = list.some(ua =>
                ua.userId?._id === FormValues.userId &&
                ua.achievementId?._id === FormValues.achievementId
            );

            if (exists) {
                this.notification.showSnack('This user already has this achievement unlocked', 'error');
                return;
            }

            const date: Date = new Date(FormValues.unlockedDate);
            const timeStr: string = FormValues.unlockedTime;
            const [hours, minutes] = timeStr.split(':').map(Number);

            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(0);

            const newUserAchievement = {
                userId: FormValues.userId,
                achievementId: FormValues.achievementId,
                platform: FormValues.platform,
                unlockedAt: date
            };

            this.userAchievementService.createUserAchievement(newUserAchievement).subscribe({
                next: () => {
                    this.userAchievementForm.reset({
                        platform: 'PC', 
                        unlockedDate: new Date(),
                        unlockedTime: '12:00' 
                    });
                    this.notification.showSnack('User achievement added successfully', 'success');
                },
                error: (error) => {
                    this.notification.showSnack('Error while saving: ' + error.message, 'error');
                }
            });
        });
    }
}
