import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAchievementsComponent } from './list-user-achievements.component';

describe('ListUserAchievementsComponent', () => {
  let component: ListUserAchievementsComponent;
  let fixture: ComponentFixture<ListUserAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUserAchievementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUserAchievementsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
