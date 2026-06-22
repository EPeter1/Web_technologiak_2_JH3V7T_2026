import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: '[app-form-error]',
    standalone: true,
    imports: [MatFormFieldModule],
    templateUrl: './form-error.component.html',
    styleUrl: './form-error.component.css'
})

export class FormErrorComponent {
    @Input() control!: AbstractControl | null;
}
