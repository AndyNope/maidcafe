import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Offer } from 'src/shared/offer.model';
import { OfferService } from 'src/shared/offer.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent implements OnInit, AfterViewChecked, OnDestroy {
  isLogged = false;
  role = 0;

  offers: Offer[];
  constructor(
    private offerService: OfferService,
    private authService: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    this.offerService.getOffers().subscribe(
      (value: any) => {
        console.log('Result: ');
        console.log(value);
        this.offers = value;
      }
    );
  }

  ngOnInit() {

  }

  editOffer(id: number) {
    this.router.navigate(['/edit-offer/' + id])
  }
  ngAfterViewChecked() {
    this.isLogged = this.authService.getLogin();
    this.role = this.authService.getRole();
  }
  ngOnDestroy() {

  }

}
