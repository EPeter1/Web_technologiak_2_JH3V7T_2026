import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { EditAchievementComponent } from '../edit-achievement/edit-achievement.component';
import { EditUserAchievementComponent } from '../edit-user-achievement/edit-user-achievement.component';
import { Achievement } from '../../models/achievement';
import { UserAchievement } from '../../models/user-achievement';
import { AchievementService } from '../../services/achievement.service';
import { UserAchievementService } from '../../services/user-achievement.service';

type ViewType = 'achievements' | 'userAchievements';

@Component({
    selector: 'app-edit-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        EditAchievementComponent,
        EditUserAchievementComponent
    ],
    templateUrl: './edit-page.component.html',
    styleUrls: ['../data-page/data-page.component.css']
})

export class EditPageComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private achievementService = inject(AchievementService);
    private userAchievementService = inject(UserAchievementService);

    private allAchievements: Achievement[] = [];
    private allUserAchievements: UserAchievement[] = [];

    selectedView: ViewType = 'achievements';
    selectedId: string | null = null;
    filteredAchievements: Achievement[] = [];
    filteredUserAchievements: UserAchievement[] = [];
    searchQuery: string = '';

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const type = params.get('type');
            const id = params.get('id');

            this.selectedView = (type as ViewType) || 'achievements';
            this.selectedId = id;

            if (this.selectedView === 'achievements') {
                this.loadAchievements();
            }
            else if (this.selectedView === 'userAchievements') {
                this.loadUserAchievements();
            }
        });
    }

    protected filterItems(): void {
        const query = this.searchQuery.toLowerCase().trim();

        if (this.selectedView === 'achievements') {
            if (!query) {
                this.filteredAchievements = this.allAchievements;
            }
            else {
                this.filteredAchievements = this.allAchievements.filter(achievement =>
                    achievement.game.toLowerCase().includes(query) ||
                    achievement.name.toLowerCase().includes(query)
                );
            }
        }
        else if (this.selectedView === 'userAchievements') {
            if (!query) {
                this.filteredUserAchievements = this.allUserAchievements;
            }
            else {
                this.filteredUserAchievements = this.allUserAchievements.filter(userAchievement =>
                    userAchievement.userId?.userName?.toLowerCase().includes(query) ||
                    userAchievement.achievementId?.game?.toLowerCase().includes(query) ||
                    userAchievement.achievementId?.name?.toLowerCase().includes(query)
                );
            }
        }
    }

    onTypeChange(value: string): void {
        this.selectedId = null;
        this.searchQuery = '';
        this.router.navigate(['/edit', value]);
    }

    onItemSelect(id: string): void {
        this.router.navigate(['/edit', this.selectedView, id]);
    }

    private loadAchievements(): void {
        this.achievementService.getAchievements().subscribe(list => {
            this.allAchievements = list;
            this.filterItems();
        });
    }

    private loadUserAchievements(): void {
        this.userAchievementService.getUserAchievements().subscribe(list => {
            this.allUserAchievements = list;
            this.filterItems();
        });
    }
}
