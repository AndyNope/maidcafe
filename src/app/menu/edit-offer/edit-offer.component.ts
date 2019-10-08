import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer } from 'src/app/shared/offer.model';
import { OfferService } from 'src/app/shared/offer.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  offer: Offer = null;

  constructor(private route: ActivatedRoute, private offerService: OfferService) { }
  offerForm:FormGroup

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.offerService.getOfferById(id).subscribe(
      (value: any) => {
        //console.log('Result: ');
        console.log(value);
        this.offer = value;
      }
    );
    console.log(this.offer);
    this.offerForm = new FormGroup({
      'offername': new FormControl(this.offer.name)
    });
  }

}
