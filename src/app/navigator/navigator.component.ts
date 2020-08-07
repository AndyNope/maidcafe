import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewChecked } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigatorComponent implements OnInit, AfterViewChecked {
  isLogged: boolean;
  role: number;
  collapsed = true;
  username: string;

  constructor(private authService: AuthService,
              private ref: ChangeDetectorRef) {
    this.isLogged = false;
  }

  ngOnInit() {
    this.isLogged = this.authService.getLogin();
    this.role = this.authService.getRole();
    if (this.isLogged) {
      this.username = this.authService.getUsername();
    }
  }

  /**
   * listening to changes
   */
  ngAfterViewChecked() {
    setTimeout(() => {
      this.isLogged = this.authService.getLogin();
      this.role = this.authService.getRole();
      if (this.isLogged) {
        this.username = this.authService.getUsername();
      }
      this.ref.markForCheck();
    }, 1);
  }

}
