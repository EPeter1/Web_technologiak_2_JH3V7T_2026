import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AchievementService } from '../../services/achievement.service';

@Component({
    selector: 'app-add-achievement',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    templateUrl: './add-achievement.component.html',
    styleUrls: ['./add-achievement.component.css']
})

export class AddAchievementComponent {
    achievementForm: FormGroup;
    difficulties = [1, 2, 3, 4];

    constructor(
        private fb: FormBuilder,
        private service: AchievementService,
        private snackBar: MatSnackBar
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
                this.showSnack('Achievement already exists', 'error');
                return;
            }

            this.service.createAchievement(newAchievement).subscribe({
                next: () => {
                    this.achievementForm.reset();
                    this.showSnack('Achievement added successfully', 'success');
                },
                error: (error) => {
                    this.showSnack('Error while saving: ' + error.message, 'error');
                }
            });
        });
    }

    private showSnack(message: string, type: 'success' | 'error') {
        this.snackBar.open(message, 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
        });
    }
}
