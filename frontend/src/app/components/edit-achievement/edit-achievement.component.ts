import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
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
    selector: 'app-edit-achievement',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        DataFormComponent,
        FormErrorComponent
    ],
    templateUrl: '../add-achievement/add-achievement.component.html',
    styleUrls: ['../add-styles.css']
})

export class EditAchievementComponent extends ManageDataDirective implements OnChanges {
    private achievementService = inject(AchievementService);
    private notificationService = inject(NotificationService);

    @Input() editId!: string;

    title = 'Edit Achievement';
    submitButtonText = 'Update';
    dataForm = createAchievementForm();

    difficulties = DIFFICULTIES;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['editId'] && this.editId) {
            this.loadAchievement();
        }
    }

    executeSubmit(): void {
        if (this.dataForm.pristine) {
            this.notificationService.showSnack('No changes detected', 'error');
            return;
        }

        const updatedAchievement = this.dataForm.getRawValue() as Achievement;

        this.achievementService.updateAchievement(this.editId, updatedAchievement).subscribe({
            next: () => {
                this.notificationService.showSnack('Achievement updated successfully', 'success');
            },
            error: (error) => {
                this.notificationService.showSnack('Update error: ' + error.message, 'error');
            }
        });
    }

    private loadAchievement(): void {
        this.achievementService.getAchievementById(this.editId).subscribe({
            next: (achievement) => {
                this.dataForm.patchValue(achievement);
            },
            error: () => {
                this.notificationService.showSnack('Failed to load achievement', 'error');
            }
        });
    }
}
