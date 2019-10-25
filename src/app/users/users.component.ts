import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
    messageService.resetMessages();
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
