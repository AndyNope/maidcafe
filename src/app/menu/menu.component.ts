import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewChecked {

  isLogged = false;
  role: number = 0;
  constructor(
    private router: Router,
    private authService: AuthService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }
  addOffer() {
    this.router.navigate(['add-offer']);
  }
  ngAfterViewChecked() {
    this.isLogged = sessionStorage.getItem('user') !== null ? true : false;
    const user = sessionStorage.getItem('user') !== null ? JSON.parse(sessionStorage.getItem('user')) : null;
    this.role = user !== null ? user.role : 0;
  }
}
