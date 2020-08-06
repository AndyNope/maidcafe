import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';

import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { DeleteModalComponent } from 'src/app/shared/modal/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from 'src/app/shared/modal/warning/warning.dialog.component';

declare function initDataTable(): any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements AfterViewChecked {
  @ViewChild(DeleteModalComponent, { static: true }) private deleteModal: DeleteModalComponent;


  deleteId = 0;
  users: User[];
  loggedUser: User;
  user: string = 'user';
  role: number = 0;

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
   * 
   * @param id 
   */
  onDeleteUser(id: number) {
    const type = "user";
    const title = "Wollen Sie diesen User wirklich löschen?";
    const body = "Dies kann nicht mehr rückgangig gemacht werden!";
    if (!this.checkLoggedUser('' + id)) {
      this.deleteModal.onDelete("user", title, body, id);
      this.deleteId = id;
    } else {
      this.deleteModal.onDelete(type, 'Sie können sich selber nicht löschen!', '', id);
    }
  }

  /**
   * after view checked
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

  openDialog(id: number) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        mode: "user",
        id: id,
        title: "Wollen Sie diesen User wirklich löschen?",
        content: "Dies kann nicht mehr rückgangig gemacht werden!"
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
    });
    
  }
}
