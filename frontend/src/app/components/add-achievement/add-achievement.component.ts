import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { createAchievementForm, DIFFICULTIES } from '../achievement-form.config';
import { DataFormComponent } from '../data-form/data-form.component';
import { FormErrorComponent } from '../form-error/form-error.component';
import { ManageDataDirective } from '../../directives/manage-data/manage-data.directive';
import { Achievement } from '../../models/achievement';
import { AchievementService } from '../../services/achievement.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-add-achievement',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        DataFormComponent,
        FormErrorComponent
    ],
    templateUrl: './add-achievement.component.html',
    styleUrls: ['./add-achievement.component.css']
})

export class AddAchievementComponent extends ManageDataDirective {
    private achievementService = inject(AchievementService);
    private notificationService = inject(NotificationService);

    title = 'Add Achievement';
    submitButtonText = 'Add';
    dataForm = createAchievementForm();

    difficulties = DIFFICULTIES;

    executeSubmit(): void {
        const newAchievement = this.dataForm.getRawValue() as Achievement;

        this.achievementService.getAchievements().subscribe(list => {
            const exists = list.some(achievement =>
                achievement.game === newAchievement.game &&
                achievement.name === newAchievement.name
            );

            if (exists) {
                this.notificationService.showSnack('Achievement already exists', 'error');
                return;
            }

            this.achievementService.createAchievement(newAchievement).subscribe({
                next: () => {
                    this.dataForm.reset({ difficulty: 1 });
                    this.notificationService.showSnack('Achievement added successfully', 'success');
                },
                error: (error) => {
                    this.notificationService.showSnack('Error while saving: ' + error.message, 'error');
                }
            });
        });
    }
}
