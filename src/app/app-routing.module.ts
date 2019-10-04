import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserComponent } from './users/user/user.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';

const appRoutes: Routes = [
    { path: '', component: MenuComponent }, 
    {
        path: 'users',canActivate: [AuthGuard], component: UsersComponent,  children: [
            { path: ':id/:name', component: UserComponent } //localhost:4200/users/anyID
        ]
    }, //localhost:4200/users
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