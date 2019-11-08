import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewChecked,
  OnInit
} from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { MessageService } from './shared/services/message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewChecked, OnInit {
  positiveMessage = '';
  negativeMessage = '';
  isLogged: boolean;
  role: number = 0;
  username: string = '';
  collapsed = true;

  /**
   * Creates an instance of app component.
   * @param authService 
   * @param ref 
   */
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private ref: ChangeDetectorRef) {
    this.isLogged = false;
  }

  ngOnInit() {
  }

  /**
   * listening to changes
   */
  ngAfterViewChecked() {
    setTimeout(() => {
      this.positiveMessage = this.messageService.getSuccessMessage();
      this.negativeMessage = this.messageService.getNegativeMessage();
      this.isLogged = this.authService.getLogin();
      this.role = this.authService.getRole();
      if (this.isLogged) {
        this.username = this.authService.getUsername();
      }
      this.ref.markForCheck();
    }, 0);
  }

}
