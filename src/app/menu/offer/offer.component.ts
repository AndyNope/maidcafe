import { Offer } from 'src/shared/model/offer.model';
import { AuthService } from 'src/shared/service/auth.service';
import { OfferService } from 'src/shared/service/offer.service';

import {
    AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent implements AfterViewChecked, OnDestroy {
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
    private ref: ChangeDetectorRef
  ) {
    this.offerService.getOffers().subscribe(
      (value: any) => {
        console.log('Result: ');
        //console.log(value);
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

  /**
   * on destroy
   */
  ngOnDestroy() {

  }

}
