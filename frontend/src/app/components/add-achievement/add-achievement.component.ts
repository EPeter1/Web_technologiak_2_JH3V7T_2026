import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AchievementService } from '../../services/achievement.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-add-achievement',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    templateUrl: './add-achievement.component.html',
    styleUrls: ['../add-styles.css']
})

export class AddAchievementComponent {
    achievementForm: FormGroup;
    difficulties = [1, 2, 3, 4];

    constructor(
        private fb: FormBuilder,
        private service: AchievementService,
        private notification: NotificationService
    )
    {
        this.achievementForm = this.fb.group({
            game: ['', Validators.required],
            name: ['', [Validators.required, Validators.maxLength(50)]],
            condition: ['', Validators.required],
            difficulty: [1, Validators.required]
        });
    }

    onSubmit() {
        if (this.achievementForm.invalid) {
            return;
        }

        const newAchievement = this.achievementForm.value;

        this.service.getAchievements().subscribe(list => {
            const exists = list.some(a =>
                a.game === newAchievement.game &&
                a.name === newAchievement.name
            );

            if (exists) {
                this.notification.showSnack('Achievement already exists', 'error');
                return;
            }

            this.service.createAchievement(newAchievement).subscribe({
                next: () => {
                    this.achievementForm.reset();
                    this.notification.showSnack('Achievement added successfully', 'success');
                },
                error: (error) => {
                    this.notification.showSnack('Error while saving: ' + error.message, 'error');
                }
            });
        });
    }
}
