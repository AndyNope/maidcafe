import { Offer } from 'src/app/shared/models/offer.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OfferService } from 'src/app/shared/services/offer.service';

import { AfterViewChecked, Component, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html'
})
export class OfferComponent implements AfterViewChecked {
  isLogged = false;
  role = 0;

  offers: Offer[];

  /**
   * Creates an instance of offer component.
   * @param offerService 
   * @param authService 
   * @param router 
   * @param ref 
   */
  constructor(
    private offerService: OfferService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.offerService.getOffers().subscribe(
      (value: any) => {
        this.offers = value;
      }
    );
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
