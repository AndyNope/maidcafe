import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewChecked {

  isLogged: boolean;
  role: number = 0;
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {
    this.isLogged = false;
  }
  ngOnInit(): void {
  }
  setIslogged() {
  }
  ngAfterViewChecked() {
    setTimeout(() => {
      this.isLogged = this.authService.loggedIn;
      const user = sessionStorage.getItem('user') !== null ? JSON.parse(sessionStorage.getItem('user')) : null;
      this.role = user !== null ? user.role : 0;
      this.ref.markForCheck();
    }, 0);
  }
  ngAfterContentInit(): void {
  }
}
