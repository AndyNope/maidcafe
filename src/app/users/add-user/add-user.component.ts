import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/shared/services/user.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  deleteId = 0;
  userForm: FormGroup;
  roleList = [
    'helper', 'service', 'admin'
  ];

  /**
   * Creates an instance of add user component.
   * @param router
   * @param messageService
   * @param userService
   */
  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private userService: UserService
  ) { }

  /**
   * on init
   */
  ngOnInit() {
    this.userForm = new FormGroup({
      user_id: new FormControl('0'),
      username: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      password_compare: new FormControl('', [Validators.required]),
      role: new FormControl(33)
    });
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const id = '' + 0;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.userForm.value.role;

    if (password === password_compare || (password + password_compare) === '') {
      const user = { id, username, email, password, role };
      this.userService.saveUser(user).subscribe(val => {
        console.log(this.userForm);
        if (val === 'added') {
          this.toasterService.showSuccess('Nyan!', 'Benutzer wurde erfolgreich hinzugefügt.');
          this.router.navigate(['/users']);
        } else {
          this.toasterService.showError('Achtung!', val);
        }
      });
    } else {
      this.toasterService.showError('Mmhh', 'Beide Passwörter müssen identisch sein!');
    }
  }

  /**
   * Cancels add user
   */
  cancel() {
    this.toasterService.showSuccess('Naja', 'War halt nicht würdig.');
    this.router.navigate(['/users']);
  }
}
