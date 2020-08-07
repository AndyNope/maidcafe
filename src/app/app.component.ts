import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  positiveMessage = '';
  negativeMessage = '';

  /**
   * Creates an instance of app component.
   * @param authService -
   * @param ref -
   */
  constructor() { }

  ngOnInit() {
  }



}
