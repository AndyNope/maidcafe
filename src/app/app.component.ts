import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewChecked {

  isLogged: boolean;
  role: number = 0;

  /**
   * Creates an instance of app component.
   * @param authService 
   * @param ref 
   */
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {
    this.isLogged = false;
  }

  /**
   * Sets islogged
   */
  setIslogged() {
  }

  /**
   * listening to changes
   */
  ngAfterViewChecked() {
    setTimeout(() => {
      this.isLogged = this.authService.getLogin();
      this.role = this.authService.getRole();
      this.ref.markForCheck();
    }, 0);
  }

}
