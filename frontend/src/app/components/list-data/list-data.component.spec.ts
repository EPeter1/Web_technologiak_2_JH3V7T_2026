import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDataComponent } from './list-data.component';

describe('ListDataComponent', () => {
    let component: ListDataComponent<any>;
    let fixture: ComponentFixture<ListDataComponent<any>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListDataComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListDataComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
