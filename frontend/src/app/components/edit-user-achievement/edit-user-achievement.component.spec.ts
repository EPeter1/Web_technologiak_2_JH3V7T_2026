import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAchievementComponent } from './edit-user-achievement.component';

describe('EditUserAchievementComponent', () => {
    let component: EditUserAchievementComponent;
    let fixture: ComponentFixture<EditUserAchievementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditUserAchievementComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditUserAchievementComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
