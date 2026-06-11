import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ListAchievementsComponent } from '../list-achievements/list-achievements.component';
import { ListUsersComponent } from '../list-users/list-users.component';
import { ListUserAchievementsComponent } from '../list-user-achievements/list-user-achievements.component';

type ViewType = 'achievements' | 'users' | 'userAchievements';

@Component({
    selector: 'app-data-page',
    standalone: true,
    imports: [
        FormsModule,
        ListUsersComponent,
        ListAchievementsComponent,
        ListUserAchievementsComponent
    ],
    templateUrl: './data-page.component.html',
    styleUrls: ['./data-page.component.css']
})

export class DataPageComponent {
    selectedView: ViewType = 'achievements';

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            const type = params.get('type');
            this.selectedView = (type as ViewType) || 'achievements';
        });
    }

    onChange(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.router.navigate(['/data', value]);
    }
}
