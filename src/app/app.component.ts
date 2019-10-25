import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewChecked {

  isLogged: boolean;
  role: number = 0;
  username: string = '';

  /**
   * Creates an instance of app component.
   * @param authService 
   * @param ref 
   */
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {
    this.isLogged = false;
  }

  /**
   * listening to changes
   */
  ngAfterViewChecked() {
    setTimeout(() => {
      this.isLogged = this.authService.getLogin();
      this.role = this.authService.getRole();
      if (this.isLogged) {
        this.username = this.authService.getUsername();
      }
      this.ref.markForCheck();
    }, 0);
  }

}
