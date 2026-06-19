import { Component, EventEmitter, Input, Output } from '@angular/core';

type Column<Item> = {
    label: string;
    value: (item: Item) => any;
};

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [],
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})

export class DataTableComponent<Item> {
    @Input() data: Item[] = [];
    @Input() columns: Column<Item>[] = [];
    @Input() showEdit = true;

    @Output() edit = new EventEmitter<Item>();
    @Output() delete = new EventEmitter<Item>();
}
