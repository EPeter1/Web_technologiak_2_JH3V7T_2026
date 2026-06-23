import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})

export class NotificationService {
    private snackBar = inject(MatSnackBar);

    showSnack(message: string, type: 'success' | 'error'): void {
        this.snackBar.open(message, 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
        });
    }
}
