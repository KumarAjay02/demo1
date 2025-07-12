import { Routes } from '@angular/router';
import { UserCreationListComponent } from './user-creation-list.component';
import { UserCreationUpdateComponent } from './user-creation-update.component';

export const userCreationRoutes: Routes = [
    {
        path: '',
        component: UserCreationListComponent,
        title: 'User Management'
    },
    {
        path: 'new',
        component: UserCreationUpdateComponent,
        title: 'Create User'
    },
    {
        path: ':id/edit',
        component: UserCreationUpdateComponent,
        title: 'Edit User'
    },
    {
        path: ':id/view',
        component: UserCreationUpdateComponent,
        title: 'View User'
    }
];
