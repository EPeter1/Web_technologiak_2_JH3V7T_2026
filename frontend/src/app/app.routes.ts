import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { AddPageComponent } from './components/add-page/add-page.component';
import { DataPageComponent } from './components/data-page/data-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
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
        path: 'add',
        canActivate: [authGuard],
        children: [
            { path: '', component: AddPageComponent },
            { path: ':type', component: AddPageComponent }
        ]
    },
    {
        path: 'edit',
        canActivate: [authGuard],
        children: [
            { path: '', component: EditPageComponent },
            { path: ':type', component: EditPageComponent },
            { path: ':type/:id', component: EditPageComponent }
        ]
    }
];
