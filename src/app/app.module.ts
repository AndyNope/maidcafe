import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserIdleModule } from 'angular-user-idle';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MenuComponent } from './menu/menu.component';
import { OfferComponent } from './menu/offer/offer.component';
import { EditOfferComponent } from './menu/edit-offer/edit-offer.component';
import { AddOfferComponent } from './menu/add-offer/add-offer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LogoutComponent } from './logout/logout.component';
import { EditMeComponent } from './edit-me/edit-me.component';
import { OrdersComponent } from './orders/orders.component';
import { StatisticComponent } from './statistic/statistic.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { DeleteModalComponent } from './shared/modal/delete-modal/delete-modal.component';
import { WarningDialogComponent } from './shared/modal/warning/warning.dialog.component';
import { ForgotpasswordModalComponent } from './shared/modal/forgotpassword-modal/forgotpassword-modal.component';


import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './shared/services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    MenuComponent,
    ErrorPageComponent,
    LogoutComponent,
    OfferComponent,
    EditOfferComponent,
    AddOfferComponent,
    EditUserComponent,
    AddUserComponent,
    DeleteModalComponent,
    ForgotpasswordModalComponent,
    EditMeComponent,
    OrdersComponent,
    StatisticComponent,
    NavigatorComponent,
    WarningDialogComponent
  ],
  entryComponents: [WarningDialogComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 300, ping: 120 }),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [AuthService, {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
