import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:
    ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loadedUser: string;
  statusList = ['Stable', 'Critical', 'Finished'];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, LoginComponent.invalidUsername]),
      'password': new FormControl(null, [Validators.required])
    });
    this.authService.init();
  }

  onSubmit() {
    console.log('Input: ' + this.loginForm.value.username + " " + this.loginForm.value.password);
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe(
      (value: any) => {
        console.log('Result: ');
        console.log(value);
        if (value !== "Benutzer nicht gefunden!" && value !== "Passwort ist falsch!") {
          this.loadedUser = value;
          this.authService.setUser(value);
          this.authService.startWatching();
          sessionStorage.setItem('user', JSON.stringify(value));
          this.router.navigate(['/']);
        } else {
          console.log('Login failed');
        }
      }
    );

    this.loginForm.reset();
  }

  static invalidUsername(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') { //Regex
      return { 'invalidUsername': true }
    }
    return null;
  }

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
