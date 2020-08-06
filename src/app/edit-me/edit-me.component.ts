import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DeleteModalComponent } from '../shared/modal/delete-modal/delete-modal.component';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from '../shared/services/message.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-edit-me',
  templateUrl: './edit-me.component.html'
})
export class EditMeComponent implements OnInit {
  @ViewChild(DeleteModalComponent, { static: true })
  private deleteModal: DeleteModalComponent;
  userForm: FormGroup;
  roleList = ['helper', 'service', 'admin'];
  user: User = null;

  /**
   * Creates an instance of edit me component.
   * @param userService 
   * @param autService 
   * @param router 
   * @param messageService 
   */
  constructor(
    private userService: UserService,
    private autService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.autService.getUserSession().subscribe(
      val => {
        this.user = val;
        this.userService.getUserById(val.id).subscribe(value => {
          if (value !== null) {
            this.userForm = new FormGroup({
              'user_id': new FormControl(value.id),
              'username': new FormControl(value.username),
              'email': new FormControl(value.email),
              'password': new FormControl(''),
              'password_compare': new FormControl(''),
              'role': new FormControl(this.roleList[(value.role / 33)])
            });
          }
        });
      }
    );

  }

  /**
   * on init
   */
  ngOnInit() {

    this.userForm = new FormGroup({
      'user_id': new FormControl('', [Validators.required]),
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl(''),
      'password': new FormControl(''),
      'password_compare': new FormControl(''),
      'role': new FormControl('', [Validators.required])
    });
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const id = +this.user.id;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.user.role ;
    if (password === password_compare || (password + password_compare) === '') {
      const user = { id: "" + id, username: username, email: email, password: password, role: role };
      this.userService.saveProfile(user)
        .subscribe(val => {
          if (val === 'saved') {
            this.messageService
              .setSuccessMessage('Daten wurden erfolgreich gespeichert.');
          } else {
            this.messageService
              .setNegativeMessage(val);
          }
        });
    } else {
      this.messageService.setNegativeMessage('Both passwords have to match');
    }
  }

  /**
   * Deletes user
   */
  deleteUser() {
    const type = "profile";
    const title = "Wollen Sie sich selbst wirklich löschen?";
    const body = "Dies kann nicht mehr rückgangig gemacht werden!";
    this.deleteModal.onDelete(type, title, body, +this.user.id);
  }

}
