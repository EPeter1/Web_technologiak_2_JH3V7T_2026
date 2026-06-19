import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-form-error',
    imports: [MatInputModule],
    templateUrl: './form-error.component.html',
    styleUrl: './form-error.component.css'
})

export class FormErrorComponent {
    @Input() control!: AbstractControl | null;
}
