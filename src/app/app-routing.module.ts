import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserComponent } from './users/user/user.component';
import { AuthGuard } from '../shared/auth-guard.service';
//import { AuthService } from './shared/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { EditOfferComponent } from './menu/edit-offer/edit-offer.component';
import { AddOfferComponent } from './menu/add-offer/add-offer.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';

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