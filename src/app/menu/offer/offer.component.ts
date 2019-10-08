import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/offer.model';
import { OfferService } from 'src/app/shared/offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  offers: Offer[];
  constructor(private offerService: OfferService, private router: Router) {

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
    this.router.navigate(['/edit/' + id])
  }


}
