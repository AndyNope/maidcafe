import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewChecked {

  isLogged: boolean;
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
      this.ref.markForCheck();
    }, 300);
  }
  ngAfterContentInit(): void {
  }
}
