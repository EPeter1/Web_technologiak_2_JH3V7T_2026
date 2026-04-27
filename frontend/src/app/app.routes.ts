import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { AddAchievementComponent } from './components/add-achievement/add-achievement.component';
import { DataPageComponent } from './components/data-page/data-page.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'data',
        canActivate: [authGuard],
        children: [
        { path: '', component: DataPageComponent },
        { path: ':type', component: DataPageComponent }
        ]
    },
    {
        path: 'add-achievement',
        component: AddAchievementComponent,
        canActivate: [authGuard]
    }
];
