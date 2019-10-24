import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { OfferComponent } from './menu/offer/offer.component';
import { EditOfferComponent } from './menu/edit-offer/edit-offer.component';
import { AddOfferComponent } from './menu/add-offer/add-offer.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';

import { AuthService } from './shared/services/auth.service';

import { AppRoutingModule } from './shared/module/app-routing.module';

import { UserIdleModule } from 'angular-user-idle';
import { AlertComponent } from './shared/modal/alert/alert.component';
import { SuccessComponent } from './shared/modal/success/success.component';
import { DeleteModalComponent } from './shared/modal/delete-modal/delete-modal.component';
import { ForgotpasswordModalComponent } from './shared/modal/forgotpassword-modal/forgotpassword-modal.component';

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
    AddUserComponent,
    AlertComponent,
    SuccessComponent,
    DeleteModalComponent,
    ForgotpasswordModalComponent
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
