import { UserService } from 'src/app/shared/services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  roleList = [
    'helper', 'service', 'admin'
  ];
  constructor(private router: Router, private userService: UserService) { }

  /**
   * on init
   */
  ngOnInit() {
    this.userForm = new FormGroup({
      'user_id': new FormControl('0'),
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl(''),
      'password': new FormControl('', [Validators.required]),
      'password_compare': new FormControl('', [Validators.required]),
      'role': new FormControl(33)
    });
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const id = 0;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.userForm.value.role;
    if (password === password_compare || (password + password_compare) === '') {
      this.userService.saveUser(id, username, email, password, role).subscribe(val => {
        console.log(this.userForm);
        if (val === 'added') {
          alert('added');
          this.router.navigate(['/users']);
        }else{
          alert(val);
        }
      });
    } else {
      alert('Both passwords have to match');
    }
  }

  /**
   * Deletes user
   */
  deleteUser() {
    // console.log('deleted');
    this.router.navigate(['/users']);
  }

  /**
   * Cancels add user 
   */
  cancel() {
    this.router.navigate(['/users']);
  }
}
