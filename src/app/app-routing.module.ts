import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {path: '', component: MenuComponent},
    {path: 'users', component: UsersComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}