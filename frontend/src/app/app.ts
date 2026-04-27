import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        CommonModule
    ],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})

export class App {
    protected readonly title = signal('frontend');

    constructor(public authService: AuthService) {}

    logout() {
        this.authService.logout();
    }
}
