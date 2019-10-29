import { Offer } from 'src/app/shared/models/offer.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { OfferService } from 'src/app/shared/services/offer.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html'
})
export class AddOfferComponent implements OnInit {
  public offer: Offer;
  offerForm: FormGroup;
  image = null;
  fileToUpload = null;


  /**
   * Creates an instance of add offer component.
   * @param route 
   * @param offerService 
   * @param router 
   * @param authService 
   * @param fileUploadService 
   */
  constructor(
    private messageService: MessageService,
    private offerService: OfferService,
    private router: Router,
    private authService: AuthService,
    private fileUploadService: FileUploadService
  ) {

  }


  /**
   * on init
   */
  ngOnInit() {
    this.offerForm = new FormGroup({
      'offer_id': new FormControl(''),
      'offername': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'imageUpload': new FormControl(''),
      'image': new FormControl('')
    });
  }

  /**
   * Add a new user
   */
  onSubmit() {
    const id = 0;
    const name = this.offerForm.value.offername;
    const price = this.offerForm.value.price;
    const description = this.offerForm.value.description;
    const image = this.fileToUpload !== null
      ? this.fileToUpload.name
      : this.offerForm.value.image;
    let allowedFileFormat = true;
    if (this.fileToUpload !== null) {
      this.fileUploadService.postfile(this.fileToUpload).subscribe(response => {
        if (response.status === "error") {
          this.messageService.setNegativeMessage(
            'Sie dürfen nur Bilder mit dem Format Gif, JPG oder PNG hochladen!'
          );
          allowedFileFormat = false;
        }
      }, error => {
        console.log(error);
      });
    }
    if (allowedFileFormat) {
      this.authService.getUserSession().subscribe(value => {
        var role: number = value.role;
        if (role > 33) {
          this.offerService.saveOffer(id, name, price, description, image).subscribe((response: any) => {
            if (response === "added") {
              this.messageService.setSuccessMessage('Angebot wurde hinzugefügt.');
              this.router.navigate(['/']);
            }
          });
        } else {
          this.messageService.setNegativeMessage('Sie haben keine Berechtigung.')
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
      });
    }
  }


  /**
     * Handles file input on changes
     * @param files 
     */
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onload = (_event) => {
      this.image = reader.result;
    };
  }

  /**
   * Navigate to root only
   */
  onCancel() {
    this.router.navigate(['/']);
  }
  removeImage() {
    this.fileToUpload = null;
    this.image = null;
  }
}
