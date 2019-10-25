import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  /**
   * Creates an instance of logout component.
   * @param authService 
   * @param router 
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.authService.setLoginFalse();
    this.messageService.resetMessages();
    setTimeout(() => {
      if (this.messageService.getSuccessMessage() !== 'Account wurde gelöscht.') {
        messageService.setSuccessMessage('Sie sind erfolgreich ausgeloggt.');
      }
      this.router.navigate(['/']);
    }, 300);
  }

  /**
   * on init
   * sign out the user
   */
  ngOnInit() {
    this.authService.logout().subscribe(() => {
      console.log('logout');
      this.authService.setLoginFalse();
      this.authService.stopWatching();
      this.authService.setUser(null);
    });
  }
}
