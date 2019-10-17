import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/shared/model/offer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/shared/service/offer.service';
import { AuthService } from 'src/shared/service/auth.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  public offer: Offer;
  offerForm: FormGroup;
  image = "";
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private router: Router,
    private authService: AuthService
  ) {

  }


  ngOnInit() {
    this.offerForm = new FormGroup({
      'offer_id': new FormControl(''),
      'offername': new FormControl('',[Validators.required]),
      'price': new FormControl('',[Validators.required]),
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

    this.authService.getUserSession().subscribe(value => {
      //console.log(value);
      var role: number = value.role;
      if (role > 33) {
        this.offerService.saveOffer(id, name, price, description, image).subscribe((value: any) => {
          if (value === "added") {
            console.log('Add Offer succeeded');
            this.router.navigate(['/']);
          }
        });
      } else {
        console.log('Sie haben keine Berechtigung');
        this.router.navigate(['/']);
      }

    }, error => {
      console.log(error);
    });
  }
  onCancel() {
    this.router.navigate(['/']);
  }
}
