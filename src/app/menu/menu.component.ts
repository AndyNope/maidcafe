import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, AfterViewChecked {

  isLogged = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }
  addOffer() {
    this.router.navigate(['addOffer']);
  }
  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.isLogged = this.authService.loggedIn;
      this.ref.markForCheck();
    }, 300);
  }
}
