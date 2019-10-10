import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/offer.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/shared/offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  public offer: Offer;
  offerForm: FormGroup;
  image = "";
  constructor(private route: ActivatedRoute, private offerService: OfferService, private router: Router) {

  }


  ngOnInit() {
    this.offerForm = new FormGroup({
      'offer_id': new FormControl(''),
      'offername': new FormControl(''),
      'price': new FormControl(''),
      'description': new FormControl(''),
      'imageUpload': new FormControl(''),
      'image': new FormControl('')
    });
  }

  onSubmit() {
    console.log('saving');
    const id = 0;
    const name = this.offerForm.value.offername;
    const price = this.offerForm.value.price;
    const description = this.offerForm.value.description;
    const image = 'https://images.unsplash.com/photo-1535924571710-4c6e27716b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80';
    this.offerService.saveOffer(id, name, price, description, image).subscribe((value: any) => {
      if (value === "added") {
        console.log('Add Offer succeeded');
        this.router.navigate(['/']);
      }
    });
  }
}
