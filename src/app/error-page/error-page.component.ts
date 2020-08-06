import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private messageService:MessageService
    ) { }

  /**
   * on init
   */
  ngOnInit() {
    this.errorMessage = this.route.snapshot.data['Message'];
    this.route.data.subscribe(
      (data:Data) => {
        this.errorMessage = data['message']
      }
    );
  }
}
