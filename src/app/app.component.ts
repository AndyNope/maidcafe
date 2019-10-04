import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterContentInit {

  isLogged = false;
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {
    setInterval(() => {
      this.isLogged = authService.loggedIn;
      this.ref.markForCheck();
    }, 300);
  }

  ngOnInit(): void {

  }
  ngAfterContentInit(): void {

  }
}
