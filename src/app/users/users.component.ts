import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  /**
   * Creates an instance of users component.
   * @param router 
   * @param messageService 
   */
  constructor(
    private router: Router,
    private messageService: MessageService
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
  ngOnDestroy() {
    this.messageService.resetMessages();
  }
}
