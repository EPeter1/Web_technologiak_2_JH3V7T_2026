import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

type Column<Item> = {
    key: string;
    label: string;
    value: (item: Item) => any;
};

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSortModule,
        MatTableModule
    ],
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})

export class DataTableComponent<Item> implements OnChanges, AfterViewInit {
    @Input() data: Item[] = [];
    @Input() columns: Column<Item>[] = [];
    @Input() showEdit = true;

    @Output() edit = new EventEmitter<Item>();
    @Output() delete = new EventEmitter<Item>();

    dataSource = new MatTableDataSource<Item>([]);
    displayedColumns: string[] = [];

    @ViewChild(MatSort) sort!: MatSort;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.dataSource.data = this.data;
        }
        if (changes['columns']) {
            this.displayedColumns = [...this.columns.map(column => column.key), 'actions'];

            this.dataSource.sortingDataAccessor = (item: Item, property: string) => {
                const column = this.columns.find(column => column.key === property);
                return column ? column.value(item) : '';
            };
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }
}
