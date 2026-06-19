import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-data-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.css']
})

export class DataFormComponent {
    @Input() title!: string;
    @Input() submitButtonText!: string;
    @Input() formGroup!: FormGroup;

    @Output() formSubmit = new EventEmitter<void>();
}
