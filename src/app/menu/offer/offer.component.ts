import { Offer } from 'src/app/shared/models/offer.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OfferService } from 'src/app/shared/services/offer.service';

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/shared/services/web-socket.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html'
})
export class OfferComponent implements AfterViewChecked, OnInit {

  isLogged = false;
  role = 0;

  offers: Offer[];

  /**
   * Creates an instance of offer component.
   * @param offerService 
   * @param authService 
   * @param router 
   */
  constructor(
    private offerService: OfferService,
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private router: Router,
  ) {
    this.offerService.getOffers().subscribe(
      (value: any) => {
        this.offers = value;
      }
    );
  }

  ngOnInit(): void {
    this.webSocketService.listen('Test').subscribe(data => {
      console.log(data);
      console.log('WebSocket is watching.');
    });
    this.webSocketService.emit('offers', (data) => {
      console.log(data);
      this.offerService.getOffers().subscribe(
        (value: any) => {
          this.offers = value;
        }
      );
    });
  }

  /**
   * Edits offer
   * @param id 
   */
  editOffer(id: number) {
    this.router.navigate(['/edit-offer/' + id])
  }

  /**
   * after view checked
   */
  ngAfterViewChecked() {
    this.isLogged = this.authService.getLogin();
    this.role = this.authService.getRole();
  }

}
