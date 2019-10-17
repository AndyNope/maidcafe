import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.setLoginFalse();
    setTimeout(() => {
      router.navigate(['/']);
    }, 1000);
  }

  ngOnInit() {
    this.authService.logout().subscribe(() => {
      console.log('logout');
      this.authService.setLoginFalse();
      this.authService.stopWatching();
      this.authService.setUser(null);
    });
  }
}
