import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        MatButtonModule
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
