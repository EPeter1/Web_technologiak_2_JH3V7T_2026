import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()

export abstract class ManageDataDirective {
    abstract title: string;
    abstract submitButtonText: string;
    abstract dataForm: FormGroup;

    onSubmit(): void {
        if (this.dataForm.invalid) {
            return;
        }

        this.executeSubmit();
    }

    abstract executeSubmit(): void;
}
