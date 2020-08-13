import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AuthService } from 'src/app/shared/services/auth.service';


/**
 * @title Warning
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  forgetPassword: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialogRef<ResetPasswordComponent>,
              private toasterService: ToasterService,
              private authService: AuthService
  ) {
    this.forgetPassword = new FormGroup({
      email: new FormControl(
        null,
        [Validators.required]
      )
    });
  }

  /**
   * when the button is submitted, the change will be processed.
   */
  send() {
    const email = { email: this.forgetPassword.value.email };
    console.log(email);
    this.authService.requestNewPassword(email).subscribe(value => {
      this.toasterService.showSuccess('', 'Eine E-Mail wurde an ' + email.email + ' gesendet!');
      this.dialog.close();
    }, error => {
      console.log(error);
      this.toasterService.showError('', error);
      this.dialog.close();
    });
  }
}
