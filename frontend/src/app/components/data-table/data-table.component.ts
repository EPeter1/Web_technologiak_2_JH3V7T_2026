import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type Column<Item> = {
    label: string;
    value: (item: Item) => any;
};

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})

export class DataTableComponent<Item> {
    @Input() data: Item[] = [];
    @Input() columns: Column<Item>[] = [];

    @Output() delete = new EventEmitter<Item>();
}
