import { UserService } from 'src/app/shared/services/user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  roleList = ['helper', 'service', 'admin'];

  /**
   * Creates an instance of edit user component.
   * @param userService 
   * @param router 
   * @param route 
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe(value => {
      this.userForm = new FormGroup({
        'user_id': new FormControl(value.id),
        'username': new FormControl(value.username),
        'email': new FormControl(value.email),
        'password': new FormControl(''),
        'password_compare': new FormControl(''),
        'role': new FormControl(value.role)
      });
    });
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
    const role = this.userForm.value.role;
    if (password === password_compare || (password + password_compare) === '') {
      this.userService.saveUser(id, username, email, password, role).subscribe(val => {
        if (val === 'saved') {
          this.router.navigate(['/users']);
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
    this.router.navigate(['/users']);
  }

}
