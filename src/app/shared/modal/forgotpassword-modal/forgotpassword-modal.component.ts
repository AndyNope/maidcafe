import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgotpassword-modal',
  templateUrl: './forgotpassword-modal.component.html'
})
export class ForgotpasswordModalComponent implements OnInit {
  forgetPassword: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.forgetPassword = new FormGroup({
      'email': new FormControl(
        null,
        [Validators.required]
      )
    });
  }

  requestPassword() {
    this.authService.requestNewPassword(this.forgetPassword.value.email).subscribe(value => {
      console.log(value);
    }, error => {
      console.log(error);
    });
    setTimeout(() => {
      this.setForm();
    }, 0);
  }
}
