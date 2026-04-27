import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { ListDataComponent } from '../list-data/list-data.component';

@Component({
    selector: 'app-list-users',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DataTableComponent
    ],
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent extends ListDataComponent<User> {
    columns = [
        { label: 'Username', value: (u: User) => u.userName },
        { label: 'Email', value: (u: User) => u.email },
        { label: 'Role', value: (u: User) => u.role }
    ];

    constructor(private userService: UserService) {
        super();
    }

    loadItems(): Observable<User[]> {
        return this.userService.getUsers();
    }

    deleteItem(user: User): void {
        if (!user._id) {
            return;
        }

        if (confirm('Delete user?')) {
            this.userService.deleteUser(user._id).subscribe(() => {
                this.refresh();
            });
        }
    }

    filterItem(user: User, term: string): boolean {
        return user.userName.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term);
    }
}
