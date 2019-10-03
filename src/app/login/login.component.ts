import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Observable, Subscription } from 'rxjs';
import { AuthService }
  from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:
    ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged =
    false;
  loginForm: FormGroup;
  statusList = ['Stable', 'Critical', 'Finished'];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, LoginComponent.invalidProjectName]),
      'password': new FormControl(null, [Validators.required])
    });
  }


  onSubmit() {
    console.log(this.loginForm.value);
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe(
      (value: any) => {
        console.log(value);
      }
    );
    this.loginForm.reset();
  }

  static invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { 'invalidProjectName': true }
    }
    return null;
  }

  static asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({ 'invalidProjectName': true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
