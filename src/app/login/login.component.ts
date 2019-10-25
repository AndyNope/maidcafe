import { Observable, Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

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
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * on init
   */
  ngOnInit() {
    this.alertMessage = "";
    this.loginForm = new FormGroup({
      'username': new FormControl(
        null,
        [Validators.required, LoginComponent.invalidUsername]
      ),
      'password': new FormControl(
        null, [Validators.required]
      )
    });
    this.authService.init();
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe(
      (value: any) => {
        if (value === "Benutzer nicht gefunden!" || value === "Passwort ist falsch!") {
          this.alertMessage = value;
        } else {
          this.loadedUser = value;
          this.authService.setUser(value);
          this.authService.startWatching();
          this.loginForm.reset();
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        alert(error);
      });
  }

  /**
   * Invalids username
   * @param control 
   * @returns username 
   */
  static invalidUsername(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') { //Regex
      return { 'invalidUsername': true }
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
          resolve({ 'invalidUsername': true });
        } else {
          resolve(null);
        }
      }, 300);
    });
    return promise;
  }
}
