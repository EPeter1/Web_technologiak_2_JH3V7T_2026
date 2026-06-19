import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    private router = inject(Router);
    private authService = inject(AuthService);

    userName = '';
    password = '';
    errorMessage = signal('');

    login() {
        this.authService.login(this.userName, this.password).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: () => {
                this.errorMessage.set('Invalid credentials');
            }
        });
    }

    onInputChange() {
        this.errorMessage.set('');
    }
}
