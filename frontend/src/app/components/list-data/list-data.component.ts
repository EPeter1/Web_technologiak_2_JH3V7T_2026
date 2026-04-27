import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';

@Component({
    selector: 'app-list-data',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './list-data.component.html',
    styleUrls: ['./list-data.component.css']
})

export abstract class ListDataComponent<Item> implements OnInit {
    items$!: Observable<Item[]>;
    filteredItems$!: Observable<Item[]>;
    searchTerm$ = new BehaviorSubject<string>('');

    private refreshSubject = new BehaviorSubject<void>(undefined);

    abstract loadItems(): Observable<Item[]>;
    abstract deleteItem(item: Item): void;
    abstract filterItem(item: Item, term: string): boolean;

    ngOnInit(): void {
        this.items$ = this.refreshSubject.pipe(
            switchMap(() => this.loadItems())
        );

        this.filteredItems$ = combineLatest([
            this.items$,
            this.searchTerm$
        ]).pipe(
            map(([items, term]) =>
                items.filter(item =>
                    this.filterItem(item, term.toLowerCase())
                )
            )
        );
    }

    protected refresh(): void {
        this.refreshSubject.next();
    }
}
