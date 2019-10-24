import { Component, Input, OnInit, Output } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent implements OnInit {
  title: string;
  body: string;
  contentType: string;
  id: number;
  constructor(private userService: UserService) {

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
  }


  confirmDelete() {
    this.userService.deleteUser(this.id).subscribe(value => {
      if (value === 'deleted') {
       // this.getUsers();
      }
    }, error => {
      console.log(error);
    });
  }
}
