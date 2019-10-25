import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { timeout } from 'q';

@Component({
  selector: 'app-edit-me',
  templateUrl: './edit-me.component.html'
})
export class EditMeComponent implements OnInit {
  userForm: FormGroup;
  roleList = ['helper', 'service', 'admin'];
  user: User;
  /**
   * Creates an instance of edit user component.
   * @param userService 
   * @param router 
   * @param route 
   */
  constructor(
    private userService: UserService,
    private autService: AuthService,
    private router: Router,
  ) {
    this.autService.getUserSession().subscribe(
      val => {
        this.user = val;
        console.log(this.user);
        console.log(val);
        this.userService.getUserById(val.id).subscribe(value => {
          console.log(value);
          if (value !== null) {
            this.userForm = new FormGroup({
              'user_id': new FormControl(value.id),
              'username': new FormControl(value.username),
              'email': new FormControl(value.email),
              'password': new FormControl(''),
              'password_compare': new FormControl(''),
              'role': new FormControl(this.roleList[(value.role / 33)])
            });
          }
        });
      }
    );

  }

  /**
   * on init
   */
  ngOnInit() {

    this.userForm = new FormGroup({
      'user_id': new FormControl('', [Validators.required]),
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl(''),
      'password': new FormControl(''),
      'password_compare': new FormControl(''),
      'role': new FormControl('', [Validators.required])
    });
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const id = this.userForm.value.user_id;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.user.id;
    if (password === password_compare || (password + password_compare) === '') {
      this.userService.saveUser(id, username, email, password, role).subscribe(val => {
        if (val === 'saved') {
          alert(val)
        } else {
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
    this.router.navigate(['/users']);
  }

  /**
   * Cancels edit user component
   */
  cancel() {
    this.router.navigate(['/']);
  }

}
