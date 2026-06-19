import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AddAchievementComponent } from '../add-achievement/add-achievement.component';
import { AddUserAchievementComponent } from '../add-user-achievement/add-user-achievement.component';

type ViewType = 'achievements' | 'userAchievements';

@Component({
    selector: 'app-add-page',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        AddAchievementComponent,
        AddUserAchievementComponent
    ],
    templateUrl: './add-page.component.html',
    styleUrls: ['./add-page.component.css']
})

export class AddPageComponent implements OnInit {
    selectedView: ViewType = 'achievements';
    id: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const type = params.get('type');
            this.id = params.get('id');
            this.selectedView = (type as ViewType) || 'achievements';
        });
    }

    onChange(value: string): void {
        this.router.navigate(['/add', value]);
    }
}
