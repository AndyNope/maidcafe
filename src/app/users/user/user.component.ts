import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/shared/models/user.model';
import { UserService } from 'src/shared/services/user.service';
import { AuthService } from 'src/shared/services/auth.service'; 
import * as $ from 'jquery';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  users: User[];
  loggedUser: User;
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
    this.getUsers();
  }


  private getUsers() {
    this.userService.getUsers().subscribe(value => {
      console.log('Result: ');
      //console.log(value);
      this.users = value;
    });
  }
  /**
   * on init
   */
  ngOnInit() {
    this.authService.getUserSession().subscribe(val => { this.loggedUser = val }, error => { console.log(error); });

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
    $('#confirmDelete').on('shown.bs.modal', function () {
      $('#confirmDelete').trigger('focus')
    });
    this.userService.deleteUser(id).subscribe(value => {
      if (value === 'deleted') {
        this.getUsers();
      }
      //console.log(value);
    }, error => {
      console.log(error);
    });
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
    return this.loggedUser.id === (id !== null || id !== '' || id !== undefined ? id : '');
  }

}
