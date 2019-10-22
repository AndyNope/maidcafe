import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

declare function showDialog(name): any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  deleteId = 0;
  users: User[];
  loggedUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.getUsers();
  }


  private getUsers() {
    this.userService.getUsers().subscribe(value => {
      this.users = value;
    });
  }
  /**
   * on init
   */
  ngOnInit() {
    this.authService.getUserSession().subscribe(val => {
      if(val !== null){
        this.loggedUser = val;
      }else{
        alert('Sie haben keine Berechtigung!')
        this.router.navigate(['/']);
      }
    }, error => {
      console.log(error);
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
   * Determines whether delete user on
   * @param id 
   */
  onDeleteUser(id: number) {
    //this.show('#confirmDelete');
    this.deleteId = id;
  }
  cancelDelete() {
    this.deleteId = 0;
  }
  confirmDelete() {
    if (this.deleteId > 0 && this.deleteId + "" !== this.loggedUser.id) {
      this.userService.deleteUser(this.deleteId).subscribe(value => {
        if (value === 'deleted') {
          this.getUsers();
        }
      }, error => {
        console.log(error);
      });
    } else {
      alert('You cannot delete yourself!');
    }
  }

  /**
 * on destroy
 */
  ngOnDestroy(): void {

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

}
