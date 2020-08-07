import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  /**
   * Creates an instance of users component.
   * @param router
   * @param messageService
   */
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  /**
   * Navigate to add user form
   */
  onAddUser() {
    this.router.navigate(['/add-user']);
  }

}
