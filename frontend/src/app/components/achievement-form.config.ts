import { FormBuilder, Validators } from '@angular/forms';

export const DIFFICULTIES = [1, 2, 3, 4];

export function createAchievementForm() {
    const formBuilder = new FormBuilder();

    return formBuilder.group({
        game: ['', Validators.required],
        name: ['', [Validators.required]],
        condition: ['', Validators.required],
        difficulty: [1, Validators.required]
    });
}
