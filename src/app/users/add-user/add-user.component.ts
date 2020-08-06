import { DeleteModalComponent } from 'src/app/shared/modal/delete-modal/delete-modal.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  @ViewChild(DeleteModalComponent, { static: true }) private deleteModal: DeleteModalComponent;
  deleteId = 0;
  userForm: FormGroup;
  roleList = [
    'helper', 'service', 'admin'
  ];


  /**
   * Creates an instance of add user component.
   * @param router 
   * @param messageService 
   * @param userService 
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  /**
   * on init
   */
  ngOnInit() {
    this.userForm = new FormGroup({
      'user_id': new FormControl('0'),
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl(''),
      'password': new FormControl('', [Validators.required]),
      'password_compare': new FormControl('', [Validators.required]),
      'role': new FormControl(33)
    });
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    const id = ""+0;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.userForm.value.role;

    if (password === password_compare || (password + password_compare) === '') {
      const user = { id: id, username: username, email: email, password: password, role: role };
      this.userService.saveUser(user).subscribe(val => {
        console.log(this.userForm);
        if (val === 'added') {
          this.messageService.setSuccessMessage('Benutzer wurde erfolgreich hinzugefügt.');
          this.router.navigate(['/users']);
        } else {
          this.messageService.setNegativeMessage(val);
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
    this.messageService.setSuccessMessage('User wurde gelöscht!');
    this.router.navigate(['/users']);
  }

  /**
   * Cancels add user 
   */
  cancel() {
    this.messageService.setSuccessMessage('Erfolgreich abgebrochen.');
    this.router.navigate(['/users']);
  }
}
