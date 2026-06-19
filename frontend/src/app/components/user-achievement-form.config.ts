import { FormBuilder, FormControl, Validators } from '@angular/forms';

export const PLATFORMS = ['PC', 'Playstation', 'Xbox', 'Switch'];

export function createUserAchievementForm() {
    const formBuilder = new FormBuilder();

    return formBuilder.group({
        userId: ['', Validators.required],
        achievementId: ['', Validators.required],
        platform: ['PC', Validators.required],
        unlockedDate: new FormControl<Date | null>(null),
        unlockedTime: ['']
    });
}
