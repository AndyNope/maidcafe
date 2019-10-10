import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { Offer } from 'src/app/shared/offer.model';
import { OfferService } from 'src/app/shared/offer.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent implements OnInit, AfterViewChecked, OnDestroy {
  isLogged = false;

  offers: Offer[];
  constructor(
    private offerService: OfferService, 
    private authService:AuthService, 
    private router: Router,
    private ref: ChangeDetectorRef
    ) {

  }

  ngOnInit() {
    this.offerService.getOffers().subscribe(
      (value: any) => {
        console.log('Result: ');
        console.log(value);
        this.offers = value;
      }
    );
  }

  editOffer(id: number) {
    this.router.navigate(['/editoffer/' + id])
  }
  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.isLogged = this.authService.loggedIn;
      this.ref.markForCheck();
    }, 300);
  }
  ngOnDestroy(): void {

  }

}
