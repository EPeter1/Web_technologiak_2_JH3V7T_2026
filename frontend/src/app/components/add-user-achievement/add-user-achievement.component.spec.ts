import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAchievementComponent } from './add-user-achievement.component';

describe('AddUserAchievementComponent', () => {
    let component: AddUserAchievementComponent;
    let fixture: ComponentFixture<AddUserAchievementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddUserAchievementComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddUserAchievementComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
