import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/shared/models/user.model';

import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { WarningDialogComponent } from 'src/app/shared/modal/warning/warning.dialog.component';

declare function initDataTable(): any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements AfterViewChecked {

  deleteId: number;
  users: User[];
  loggedUser: User;
  user = 'user';
  role = 0;

  // Set the status of login
  isLogged = false;

  /**
   * Creates an instance of user component.
   * @param userService
   * @param router
   * @param authService
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.getUsers();
  }

  /**
   * Refresh list
   */
  refreshList() {
    this.getUsers();
  }

  /**
   * Gets users
   */
  getUsers() {
    this.userService.getUsers().subscribe((value) => {
      this.users = value;
      setTimeout(() => {
        initDataTable();
      }, 0);
    });
  }

  /**
   * Determines whether edit user on
   * @param id
   */
  onEditUser(id: number) {
    this.router.navigate(['edit-user/' + id]);
  }

  /**
   * After view checked
   */
  ngAfterViewChecked() {
    this.isLogged = this.authService.getLogin();
    this.role = this.authService.getRole();
  }

  /**
   * Cancels delete
   */
  cancelDelete() {
    this.deleteId = 0;
  }

  /**
   * Checks logged user
   * @param id
   * @returns true if logged user
   */
  checkLoggedUser(id: string = ''): boolean {
    if (this.loggedUser !== undefined) {
      if (id === this.loggedUser.id) {
        return true;
      }
    }
    return false;
  }

  /**
   * Ask confirmtion
   */
  openDialog(id: number) {
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
        this.refreshList();
      } else if (result === 'error') {
        alert('Etwas ist schiefgelaufen.');
      }
    });
  }
}
