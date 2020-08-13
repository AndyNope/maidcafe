import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {
  counter = 10;
  constructor(
    private router: Router
  ) { }

  /**
   * on init
   */
  async ngOnInit() {
    for (let i = this.counter; i > 0; i--) {
      this.counter = i;
      await this.delay(1000);
    }
    this.router.navigate(['/']);
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
