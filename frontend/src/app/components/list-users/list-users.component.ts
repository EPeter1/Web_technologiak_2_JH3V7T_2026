import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { DataTableComponent } from '../data-table/data-table.component';
import { ListDataDirective } from '../../directives/list-data/list-data.directive';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-list-users',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        DataTableComponent
    ],
    templateUrl: '../list-achievements/list-achievements.component.html',
    styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent extends ListDataDirective<User> {
    private userService = inject(UserService);

    columns = [
        { label: 'Username', value: (user: User) => user.userName },
        { label: 'Email', value: (user: User) => user.email },
        { label: 'Role', value: (user: User) => user.role }
    ];

    loadItems(): Observable<User[]> {
        return this.userService.getUsers();
    }

    editItem(user: User): void {
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
