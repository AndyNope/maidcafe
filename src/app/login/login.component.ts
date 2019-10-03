import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  isLogged = false;
  loginForm: FormGroup;    
  loadedUser:string;
  statusList = ['Stable', 'Critical', 'Finished'];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, LoginComponent.invalidUsername], LoginComponent.asyncInvalidUsername),
      'password': new FormControl(null, [Validators.required])
    });
  }


  onSubmit() {
    console.log('Input: ' + this.loginForm.value.username + " " + this.loginForm.value.password);
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe(
      (value: any) => {
        console.log('Result: ');
        console.log(value);
        if (value !== "Benutzer nicht gefunden!") {
          this.loadedUser = value;
          this.isLogged = true;
        }
      }
    );
    if(this.isLogged){
      console.log('Erfolreich eingeloggt');
      
    }
    this.loginForm.reset();
  }

  static invalidUsername(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
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
      }, 2000);
    });
    return promise;
  }
}
