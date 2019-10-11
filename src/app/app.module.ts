import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { AuthGuard } from '../shared/auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { OfferComponent } from './menu/offer/offer.component';
import { UserIdleModule } from 'angular-user-idle';
import { EditOfferComponent } from './menu/edit-offer/edit-offer.component';
import { AddOfferComponent } from './menu/add-offer/add-offer.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    MenuComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    LogoutComponent,
    OfferComponent,
    EditOfferComponent,
    AddOfferComponent,
    EditUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 300, ping: 120 })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
