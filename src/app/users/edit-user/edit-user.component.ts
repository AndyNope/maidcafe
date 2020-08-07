
import { UserService } from 'src/app/shared/services/user.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToasterService } from 'src/app/shared/services/toaster.service';
import { WarningDialogComponent } from 'src/app/shared/modal/warning/warning.dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  deleteId = 0;
  userForm: FormGroup;
  roleList = ['helper', 'service', 'admin'];


  /**
   * Creates an instance of edit user component.
   * @param userService
   * @param router
   * @param messageService
   * @param route
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.deleteId = this.route.snapshot.params.id;
    this.userService.getUserById(this.deleteId).subscribe(value => {
      this.userForm = new FormGroup({
        user_id: new FormControl(value.id),
        username: new FormControl(value.username),
        email: new FormControl(value.email),
        password: new FormControl(''),
        password_compare: new FormControl(''),
        role: new FormControl(value.role)
      });
    });
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
    const id = this.userForm.value.user_id;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.userForm.value.role;

    if (password === password_compare || (password + password_compare) === '') {
      const user = { id, username, email, password, role };
      this.userService.saveUser(user).subscribe(val => {
        if (val === 'saved') {
          this.toasterService.showSuccess('Gut!', 'Benutzer erfolgreich gespeichert');
          this.router.navigate(['/users']);
        } else {
          this.toasterService.showError('Awe', val);
        }
      }, error => {
        this.toasterService.showError('No!', error);
      });
    } else {
      this.toasterService.showError('Hahaha', 'Die Passwörter müssen doch gleich sein! ^^');
    }
  }

  /**
   * Deletes user
   */
  deleteUser() {
    this.router.navigate(['/users']);
  }
  onDeleteUser(id: number) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        mode: 'user',
        id,
        title: 'Wollen Sie diesen User wirklich löschen?',
        content: 'Dies kann nicht mehr rückgangig gemacht werden!'
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/users']);
      } else if (result === 'error') {
        alert('Etwas ist schiefgelaufen.');
      }
    });
  }


  /**
   * Cancels edit user component
   */
  cancel() {
    this.toasterService.showSuccess('Piuhh', 'Da ist jemand aber verschont worden! ;D');
    this.router.navigate(['/users']);
  }

}
