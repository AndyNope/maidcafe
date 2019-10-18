import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  /**
   * Creates an instance of logout component.
   * @param authService 
   * @param router 
   */
  constructor(private authService: AuthService, private router: Router) {
    this.authService.setLoginFalse();
    setTimeout(() => {
      router.navigate(['/']);
    }, 1000);
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
