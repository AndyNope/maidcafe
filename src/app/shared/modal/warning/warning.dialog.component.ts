import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MessageService } from '../../services/message.service';
import { OfferService } from '../../services/offer.service';
import { UserService } from '../../services/user.service';

/**
 * @title Warning
 */
@Component({
    selector: 'app-warning-dialog-component',
    templateUrl: './warning.dialog.component.html',
})
export class WarningDialogComponent {
    title: string = "";
    content: string = "";

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialogRef<WarningDialogComponent>,
        private userService: UserService,
        private offerSerice: OfferService,
        private messageService: MessageService,
        private router: Router
    ) { 
        this.title = this.data.title;
        this.content = this.data.content;
    }

    onSubmit() {
        if (this.data.mode == "user") {
            this.userService.deleteUser(this.data.id).subscribe(value => {
                if (value === 'deleted') {
                    this.userService.getUsers().subscribe((value) => {
                        this.messageService.setSuccessMessage(this.data.mode.toUpperCase() + " wurde gelöscht.");
                        this.dialog.close("success");
                    });
                }
            }, error => {
                console.log(error);
                this.dialog.close("error");
            });
        }

    }


}

