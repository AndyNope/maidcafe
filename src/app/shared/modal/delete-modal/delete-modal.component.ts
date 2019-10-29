import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { OfferService } from '../../services/offer.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent implements OnInit {
  @Output() deleteConfirmed = new EventEmitter<{ confirmed: boolean }>();
  title: string;
  body: string;
  contentType: string;
  id: number;


  constructor(
    private userService: UserService,
    private offerSerice: OfferService,
    private messageService: MessageService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  onDelete(type: string, title: string, body: string, id: number) {
    this.contentType = type;
    this.title = title;
    this.body = body;
    this.id = id;
  }

  cancelDelete() {
    this.id = 0;
    this.messageService.setSuccessMessage(this.contentType.toUpperCase() + " wurde nicht gelöscht.");
  }


  confirmDelete() {
    switch (this.contentType) {
      case 'user':
        this.userService.deleteUser(this.id).subscribe(value => {
          if (value === 'deleted') {
            this.userService.getUsers().subscribe((value) => {
              this.deleteConfirmed.emit({ confirmed: true });
              this.messageService.setSuccessMessage(this.contentType.toUpperCase() + " wurde gelöscht.");
            });
          }
        }, error => {
          console.log(error);
        });
        break;
      case 'profile':
        this.userService.deleteProfile(this.id).subscribe(value => {
          if (value === 'deleted') {
            this.messageService.setSuccessMessage('Account wurde gelöscht.');
            this.router.navigate(['/logout']);
          }
        }, error => {
          console.log(error);
        });
        break;
      case 'offer':
        this.offerSerice.deleteOffer(this.id).subscribe(value => {
          if (value === 'deleted') {
            this.offerSerice.getOffers().subscribe(() => { });
          }
        }, error => {
          console.log(error);
        });
        break;
    }

  }
}
