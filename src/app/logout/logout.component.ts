import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) {
    this.authService.logout();
    this.authService.setLoginFalse();
    router.navigate(['/']);
  }

  ngOnInit() {

  }

}
