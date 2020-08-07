import {
  AfterViewChecked,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, AfterViewChecked {

  /**
   * Determines whether logged is
   */
  isLogged = false;

  /**
   * Role of the user
   */
  role = 0;

  /**
   * Creates an instance of menu component.
   * @param router
   * @param authService
   * @param ref
   */
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

  /**
   * on init
   */
  ngOnInit() {
  }

  /**
   * Adds offer
   */
  addOffer() {
    this.router.navigate(['add-offer']);
  }

  /**
   * after view checked
   */
  ngAfterViewChecked() {
    this.isLogged = this.authService.getLogin();
    this.role = this.authService.getRole();
  }
}
