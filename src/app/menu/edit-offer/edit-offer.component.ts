import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Offer } from 'src/app/shared/models/offer.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { OfferService } from 'src/app/shared/services/offer.service';
import { WarningDialogComponent } from 'src/app/shared/modal/warning/warning.dialog.component';
import { ToasterService } from 'src/app/shared/services/toaster.service';

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
    private fileUploadService: FileUploadService,
    private toasterService: ToasterService,
    public dialog: MatDialog
  ) {
    const id = this.route.snapshot.params.id;
    this.offerService.getOfferById(id).subscribe(
      (value: any) => {
        this.offer = value;
        this.offerForm = new FormGroup({
          offer_id: new FormControl(value.id),
          offername: new FormControl(value.name),
          price: new FormControl(value.price),
          description: new FormControl(value.description),
          imageUpload: new FormControl(null),
          image: new FormControl(value.image)
        });
        this.image = value.image;
      }, error => {
        this.toasterService.showError('Fehler', error);
      });

  }

  /**
   * on init
   * initialize reactive fromular
   */
  ngOnInit() {
    this.offerForm = new FormGroup({
      offer_id: new FormControl('', [Validators.required]),
      offername: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      imageUpload: new FormControl(''),
      image: new FormControl('')
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
    let allowedFileFormat = true;
    if (this.fileToUpload !== null) {
      this.fileUploadService.postfile(this.fileToUpload)
        .subscribe(response => {
          if (response.status === 'error') {
            this.toasterService.showError('Achtung!', 'Sie dürfen nur Bilder mit dem Format Gif, JPG oder PNG hochladen!');
            allowedFileFormat = false;
          }
        }, error => {
          console.log(error);
        });
    }
    if (allowedFileFormat) {
      this.authService.getUserSession().subscribe(value => {
        const role: number = value.role;
        if (role > 66) {
          const offer = {
            id: '' + id,
            name: '' + name,
            price,
            description: '' + description,
            image: this.removedImage ? '' : image
          };
          this.offerService.saveOffer(
            offer
          ).subscribe((message: string) => {
            if (message === 'saved') {
              this.toasterService.showSuccess('Super!', 'Angebot wurde gespeichert.');
              this.router.navigate(['/']);
            }
          });
        } else {
          this.toasterService.showError('Ups!', 'Sie haben keine Berechtigung.');
          this.router.navigate(['/']);
        }
      });
    }


  }

  /**
   * Deletes offer
   */
  deleteOffer() {
    const id = this.offerForm.value.offer_id;
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        mode: 'offer',
        id,
        title: 'Wollen Sie dieses Angebot wirklich löschen?',
        content: 'Dies kann nicht mehr rückgangig gemacht werden!'
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/']);
      } else if (result === 'error') {
        alert('Etwas ist schiefgelaufen.');
      }
    });
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
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    // tslint:disable-next-line:variable-name
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
