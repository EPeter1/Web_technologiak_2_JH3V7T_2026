import { Directive, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';

@Directive()

export abstract class ListDataDirective<Item> implements OnInit {
    private refreshSubject = new BehaviorSubject<void>(undefined);

    items$!: Observable<Item[]>;
    filteredItems$!: Observable<Item[]>;
    searchTerm$ = new BehaviorSubject<string>('');

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

    abstract loadItems(): Observable<Item[]>;
    abstract editItem(item: Item): void;
    abstract deleteItem(item: Item): void;
    abstract filterItem(item: Item, term: string): boolean;
}
