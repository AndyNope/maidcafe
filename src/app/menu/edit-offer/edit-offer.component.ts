import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Offer } from 'src/app/shared/offer.model';
import { OfferService } from 'src/app/shared/offer.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  public offer: Offer;
  offerForm: FormGroup;

  constructor(private route: ActivatedRoute, private offerService: OfferService, private router: Router) {
    const id = this.route.snapshot.params['id'];
    this.offerService.getOfferById(id).subscribe(
      (value: any) => {
        console.log('Result: ');
        console.log(value);
        console.log(value.image);
        this.offer = value;
        this.offerForm = new FormGroup({
          'offer_id': new FormControl(value.id),
          'offername': new FormControl(value.name),
          'price': new FormControl(value.price),
          'description': new FormControl(value.description),
          'imageUpload': new FormControl(''),
          'image': new FormControl(value.image)
        });
      }
    );

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
    const id = this.offerForm.value.offer_id;
    const name = this.offerForm.value.offername;
    const price = this.offerForm.value.price;
    const description = this.offerForm.value.description;
    const image = this.offerForm.value.image;
    this.offerService.saveOffer(id, name, price, description, image).subscribe((value: any) => {
      console.log(value);
      if (value === "saved") {
        console.log('save successful');
        this.router.navigate(['/']);
      }
    });
  }

  deleteOffer() {
    const id = this.offerForm.value.offer_id;
    this.offerService.deleteOffer(id).subscribe(
      (value: any) => {
        if (value === "deleted") {
          console.log('deleted');
          this.router.navigate(['/']);
        }
      }
    );
  }

}
