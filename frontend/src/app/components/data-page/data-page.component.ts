import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ListAchievementsComponent } from '../list-achievements/list-achievements.component';
import { ListUserAchievementsComponent } from '../list-user-achievements/list-user-achievements.component';
import { ListUsersComponent } from '../list-users/list-users.component';

type ViewType = 'achievements' | 'userAchievements' | 'users';

@Component({
    selector: 'app-data-page',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        ListAchievementsComponent,
        ListUserAchievementsComponent,
        ListUsersComponent
    ],
    templateUrl: './data-page.component.html',
    styleUrls: ['./data-page.component.css']
})

export class DataPageComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    selectedView: ViewType = 'achievements';

    ngOnInit(): void {
        this.route.paramMap.subscribe(parameters => {
            const type = parameters.get('type');
            this.selectedView = (type as ViewType) || 'achievements';
        });
    }

    onTypeChange(value: string): void {
        this.router.navigate(['/data', value]);
    }
}
