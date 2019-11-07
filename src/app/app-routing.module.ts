import { EditMeComponent } from 'src/app/edit-me/edit-me.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AddOfferComponent } from './menu/add-offer/add-offer.component';
import { EditOfferComponent } from './menu/edit-offer/edit-offer.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'edit-offer/:id', canActivate: [AuthGuard], component: EditOfferComponent },
    { path: 'add-offer', canActivate: [AuthGuard], component: AddOfferComponent },
    { path: 'edit-me', canActivate: [AuthGuard], component: EditMeComponent },
    {
        path: 'users', canActivate: [AuthGuard], component: UsersComponent, children: [
            { path: ':id/:name', canActivate: [AuthGuard], component: UserComponent } //localhost:4200/users/anyID
        ]
    }, //localhost:4200/users
    { path: 'edit-user/:id', canActivate: [AuthGuard], component: EditUserComponent },
    { path: 'add-user', canActivate: [AuthGuard], component: AddUserComponent },
    { path: 'orders', canActivate: [AuthGuard], component: OrdersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'not-found', component: ErrorPageComponent, data: { message: '' } },
    { path: '**', redirectTo: '/not-found' } //, pathMatch: 'full'
];

/**
 * Ng module
 */
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule {

}