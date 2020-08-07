import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { WarningDialogComponent } from '../shared/modal/warning/warning.dialog.component';
import { ToasterService } from '../shared/services/toaster.service';

@Component({
  selector: 'app-edit-me',
  templateUrl: './edit-me.component.html'
})
export class EditMeComponent implements OnInit {
  userForm: FormGroup;
  roleList = ['helper', 'service', 'admin'];
  user: User = null;

  /**
   * Creates an instance of edit me component.
   * @param userService -
   * @param autService -
   * @param router -
   * @param messageService -
   */
  constructor(
    private userService: UserService,
    private autService: AuthService,
    private toasterService: ToasterService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.autService.getUserSession().subscribe(
      val => {
        this.user = val;
        this.userService.getUserById(val.id).subscribe(value => {
          if (value !== null) {
            this.userForm = new FormGroup({
              user_id: new FormControl(value.id),
              username: new FormControl(value.username),
              email: new FormControl(value.email),
              password: new FormControl(''),
              password_compare: new FormControl(''),
              role: new FormControl(this.roleList[(value.role / 33)])
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
      user_id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      password: new FormControl(''),
      password_compare: new FormControl(''),
      role: new FormControl('', [Validators.required])
    });
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const id = +this.user.id;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.user.role;
    if (password === password_compare || (password + password_compare) === '') {
      const user = { id: '' + id, username, email, password, role };
      this.userService.saveProfile(user).subscribe(val => {
        if (val === 'saved') {
          this.toasterService.showSuccess('', 'Daten wurden erfolgreich gespeichert.');
        } else {
          this.toasterService.showError('Auchtung!', '' + val);
        }
      });
    } else {
      this.toasterService.showError('Achtung!', 'Beide Passwörter müssen identisch sein!');
    }
  }

  /**
   * Deletes user
   */
  deleteUser() {
    const id = +this.user.id;
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        mode: 'user',
        id,
        title: 'Wollen Sie sich selbst wirklich löschen?',
        content: 'Dies kann nicht mehr rückgangig gemacht werden!'
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/']);
      } else if (result === 'error') {
        alert('Etwas ist schiefgelaufen.');
      }
    });
  }

}
