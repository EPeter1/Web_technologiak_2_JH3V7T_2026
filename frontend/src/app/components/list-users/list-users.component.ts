import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        DataTableComponent
    ],
    templateUrl: '../list-achievements/list-achievements.component.html',
    styleUrls: ['../list-achievements/list-achievements.component.css']
})

export class ListUsersComponent extends ListDataDirective<User> {
    private dialog = inject(MatDialog);
    private userService = inject(UserService);

    columns = [
        { key: 'username', label: 'Username', value: (user: User) => user.userName },
        { key: 'email', label: 'Email', value: (user: User) => user.email },
        { key: 'role', label: 'Role', value: (user: User) => user.role }
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

        const dialogReference = ConfirmDialogComponent.open(this.dialog, user.userName);

        dialogReference.afterClosed().subscribe((confirmed) => {
            if (confirmed === true) {
                this.userService.deleteUser(user._id!).subscribe(() => {
                    this.refresh();
                });
            }
        });
    }

    filterItem(user: User, term: string): boolean {
        return user.userName.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term);
    }
}
