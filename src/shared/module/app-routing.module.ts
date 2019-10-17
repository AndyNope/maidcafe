import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

//components
import { MenuComponent } from '../../app/menu/menu.component';
import { UsersComponent } from '../../app/users/users.component';
import { LoginComponent } from '../../app/login/login.component';
import { ErrorPageComponent } from '../../app/error-page/error-page.component';
import { UserComponent } from '../../app/users/user/user.component';
import { LogoutComponent } from '../../app/logout/logout.component';
import { EditOfferComponent } from '../../app/menu/edit-offer/edit-offer.component';
import { AddOfferComponent } from '../../app/menu/add-offer/add-offer.component';
import { EditUserComponent } from '../../app/users/edit-user/edit-user.component';
import { AddUserComponent } from '../../app/users/add-user/add-user.component';

//Service
import { AuthGuard } from '../service/auth-guard.service';

const appRoutes: Routes = [
    { path: '', component: MenuComponent }, 
    { path: 'edit-offer/:id', component: EditOfferComponent }, 
    { path: 'add-offer', component: AddOfferComponent }, 
    {
        path: 'users',canActivate: [AuthGuard], component: UsersComponent,  children: [
            { path: ':id/:name', component: UserComponent } //localhost:4200/users/anyID
        ]
    }, //localhost:4200/users
    { path: 'edit-user/:id', component: EditUserComponent }, 
    { path: 'add-user', component: AddUserComponent }, 
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent},
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found' } },
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