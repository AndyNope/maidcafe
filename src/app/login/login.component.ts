import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../shared/services/auth.service';
import { ToasterService } from '../shared/services/toaster.service';
import { ResetPasswordComponent } from './modal/reset-password/reset-password.component';

/**
 * Component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loadedUser: string;
  alertMessage: string;
  statusList = ['Stable', 'Critical', 'Finished'];

  /**
   * Creates an instance of login component.
   * @param authService
   * @param router
   */
  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  /**
   * Invalids username
   * @param control -
   * @returns username
   */
  static invalidUsername(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') { // Regex TODO
      return { invalidUsername: true };
    }
    return null;
  }

  /**
   * Asyncs invalid username
   * @param control
   * @returns invalid username
   */
  static asyncInvalidUsername(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({ invalidUsername: true });
        } else {
          resolve(null);
        }
      }, 0);
    });
    return promise;
  }

  /**
   * on init
   */
  ngOnInit() {
    this.alertMessage = '';
    this.loginForm = new FormGroup({
      username: new FormControl(
        null,
        [Validators.required, LoginComponent.invalidUsername]
      ),
      password: new FormControl(
        null, [Validators.required]
      )
    });
    this.authService.init();
  }

  /**
   * Submit access data
   */
  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe(
      (value: any) => {
        if (value === 'Benutzer nicht gefunden!' || value === 'Passwort ist falsch!') {
          this.toasterService.showError('Leider ist etwas schief gegangen!', value);

        } else {
          this.loadedUser = value;
          this.authService.setUser(value);
          this.authService.startWatching();
          this.loginForm.reset();
          this.toasterService.showSuccess('Super!', 'Sie sind erfolgreich eingeloggt!');
          this.router.navigate(['/']);
        }
      }, error => {
      });

  }

  /**
   * reset password
   */
  resetPassword() {

    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: {}
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/users']);
      } else if (result === 'error') {
        alert('Etwas ist schiefgelaufen.');
      }
    });
  }

}
