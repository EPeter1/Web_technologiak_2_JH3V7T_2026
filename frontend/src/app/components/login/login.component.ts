import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FormErrorComponent } from '../form-error/form-error.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormErrorComponent
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private authService = inject(AuthService);
    private notificationService = inject(NotificationService);

    loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
    });

    login() {
        if (this.loginForm.invalid) {
            return;
        }

        const { userName, password } = this.loginForm.getRawValue();

        this.authService.login(userName!, password!).subscribe({
            next: () => {
                this.router.navigate(['/data', 'achievements']);
            },
            error: () => {
                this.loginForm.get('password')?.setErrors({ invalidCredentials: true });
                this.notificationService.showSnack('Login failed!', 'error');
            }
        });
    }
}
