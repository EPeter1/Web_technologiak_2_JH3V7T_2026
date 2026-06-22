import { Component, inject, OnInit } from '@angular/core';
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
    styleUrls: ['../data-page/data-page.component.css']
})

export class AddPageComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    selectedView: ViewType = 'achievements';
    id: string | null = null;

    ngOnInit(): void {
        this.route.paramMap.subscribe(parameters => {
            const type = parameters.get('type');

            this.id = parameters.get('id');
            this.selectedView = (type as ViewType) || 'achievements';
        });
    }

    onTypeChange(value: string): void {
        this.router.navigate(['/add', value]);
    }
}
