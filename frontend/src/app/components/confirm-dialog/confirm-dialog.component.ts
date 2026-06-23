import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})

export class ConfirmDialogComponent {
    private dialogReference = inject(MatDialogRef<ConfirmDialogComponent>);
    protected itemName = inject<string>(MAT_DIALOG_DATA);

    static open(dialog: MatDialog, itemName: string): MatDialogRef<ConfirmDialogComponent, boolean> {
        return dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: itemName
        });
    }

    onCancel(): void {
        this.dialogReference.close(false);
    }

    onConfirm(): void {
        this.dialogReference.close(true);
    }
}
