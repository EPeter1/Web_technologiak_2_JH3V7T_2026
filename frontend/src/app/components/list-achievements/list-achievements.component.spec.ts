import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAchievementsComponent } from './list-achievements.component';

describe('ListAchievementsComponent', () => {
  let component: ListAchievementsComponent;
  let fixture: ComponentFixture<ListAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAchievementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAchievementsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
