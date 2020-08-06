import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DeleteModalComponent } from './modal/delete-modal/delete-modal.component';
import { ForgotpasswordModalComponent } from './modal/forgotpassword-modal/forgotpassword-modal.component';
import { WarningDialogComponent } from './modal/warning/warning.dialog.component';
import { LoginComponent } from '../login/login.component';
import { UsersComponent } from '../users/users.component';
import { UserComponent } from '../users/user/user.component';
import { LogoutComponent } from '../logout/logout.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DeleteModalComponent,
    ForgotpasswordModalComponent,
    WarningDialogComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    LogoutComponent,
  ],
  entryComponents: [WarningDialogComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ] 
})
export class SharedModule { }
