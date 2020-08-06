import { Component, OnInit } from '@angular/core';

import { MessageService } from './shared/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  positiveMessage = '';
  negativeMessage = '';

  /**
   * Creates an instance of app component.
   * @param authService 
   * @param ref 
   */
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.positiveMessage = this.messageService.getSuccessMessage();
    this.negativeMessage = this.messageService.getNegativeMessage();
  }



}
