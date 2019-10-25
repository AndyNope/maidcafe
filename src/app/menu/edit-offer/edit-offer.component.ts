import { Offer } from 'src/app/shared/models/offer.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { OfferService } from 'src/app/shared/services/offer.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html'
})
export class EditOfferComponent implements OnInit {

  public offer: Offer;
  offerForm: FormGroup;
  fileToUpload = null;
  imageUpload = null;
  image = null;
  removedImage = false;

  /**
   * Creates an instance of edit offer component.
   * @param route 
   * @param offerService 
   * @param router 
   * @param authService 
   * @param fileUploadService 
   */
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private router: Router,
    private authService: AuthService,
    private fileUploadService: FileUploadService
  ) {
    const id = this.route.snapshot.params['id'];
    this.offerService.getOfferById(id).subscribe(
      (value: any) => {
        this.offer = value;
        this.offerForm = new FormGroup({
          'offer_id': new FormControl(value.id),
          'offername': new FormControl(value.name),
          'price': new FormControl(value.price),
          'description': new FormControl(value.description),
          'imageUpload': new FormControl(null),
          'image': new FormControl(value.image)
        });
        this.image = value.image;
      }, error => {
        console.log(error);
      });

  }


  /**
   * on init
   */
  ngOnInit() {

    this.offerForm = new FormGroup({
      'offer_id': new FormControl('', [Validators.required]),
      'offername': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'imageUpload': new FormControl(''),
      'image': new FormControl('')
    });
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const id = this.offerForm.value.offer_id;
    const name = this.offerForm.value.offername;
    const price = this.offerForm.value.price;
    const description = this.offerForm.value.description;
    const image = this.fileToUpload !== null ? '/upload/' + this.fileToUpload.name : this.offerForm.value.image;
    if (this.fileToUpload !== null) {
      this.fileUploadService.postfile(this.fileToUpload)
        .subscribe(value => {
          if (value = "not allowed file") {
            alert('Fileformat not allowed!');
            return;
          }
        }, error => {
          console.log(error);
        });
    }
    this.authService.getUserSession().subscribe(value => {
      //console.log(value);
      const role: number = value.role;
      if (role > 66) {
        this.offerService.saveOffer(
          id,
          name,
          price,
          description,
          this.removedImage ? '' : image
        ).subscribe((value: any) => {
          if (value === "saved") {
            this.router.navigate(['/']);
          }
        });
      } else {
        alert('Sie haben keine Berechtigung');
        this.router.navigate(['/']);
      }
    });

  }


  /**
   * Deletes offer
   */
  deleteOffer() {
    const id = this.offerForm.value.offer_id;
    this.offerService.deleteOffer(id).subscribe(
      (value: any) => {
        if (value === "deleted") {
          alert('Delete successful');
          this.router.navigate(['/']);
        }
      }
    );
  }

  /**
   * Cancels edit offer component
   */
  cancel() {
    this.router.navigate(['/']);
  }


  /**
   * Handles file input on changes
   * @param files 
   */
  handleFileInput(files: FileList) {
    // console.log('FileList:');
    // console.log(files);
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onload = (_event) => {
      this.image = reader.result;
    };
    this.removedImage = false;
  }
  removeImage() {
    this.removedImage = true;
    this.fileToUpload = null;
    this.imageUpload = null;
    this.image = null;
  }
}
