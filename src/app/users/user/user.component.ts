import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/shared/model/user.model';
import { UserService } from 'src/shared/service/user.service';
import { AuthService } from 'src/shared/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  users: User[];
  loggedUser: User;
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
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
    this.userService.deleteUser(id).subscribe(value => {
      if (value === 'deleted') {
        this.router.navigate(['/users'])
      }
      //console.log(value);
    }, error => {
      console.log(error);
    });
  }
  
  /**
   * Checks logged user
   * @param id 
   * @returns true if logged user 
   */
  checkLoggedUser(id: string): boolean {
    return this.loggedUser.id === id;
  }

}
