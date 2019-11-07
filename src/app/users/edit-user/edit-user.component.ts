import { DeleteModalComponent } from 'src/app/shared/modal/delete-modal/delete-modal.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  @ViewChild(DeleteModalComponent, { static: true }) private deleteModal: DeleteModalComponent;
  deleteId = 0;
  userForm: FormGroup;
  roleList = ['helper', 'service', 'admin'];


  /**
   * Creates an instance of edit user component.
   * @param userService 
   * @param router 
   * @param messageService 
   * @param route 
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private messageService:MessageService,
    private route: ActivatedRoute
  ) {
    this.deleteId = this.route.snapshot.params['id'];
    this.userService.getUserById(this.deleteId).subscribe(value => {
      this.userForm = new FormGroup({
        'user_id': new FormControl(value.id),
        'username': new FormControl(value.username),
        'email': new FormControl(value.email),
        'password': new FormControl(''),
        'password_compare': new FormControl(''),
        'role': new FormControl(value.role)
      });
    });
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
    const id = this.userForm.value.user_id;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.userForm.value.role;

    if (password === password_compare || (password + password_compare) === '') {
      this.userService.saveUser(id, username, email, password, role).subscribe(val => {
        if (val === 'saved') {
          this.messageService.setSuccessMessage('Benutzer erfolgreich gespeichert');
          this.router.navigate(['/users']);
        } else {
          this.messageService.setNegativeMessage(val);
        }
      }, error =>{
        this.messageService.setNegativeMessage(error);
      });
    } else {
      this.messageService.setNegativeMessage('Both passwords have to match');
    }
  }

  /**
   * Deletes user
   */
  deleteUser() {
    this.router.navigate(['/users']);
  }
  onDeleteUser(id: number) {
    const type = "user";
    const title = "Wollen Sie diesen User wirklich löschen?";
    const body = "Dies kann nicht mehr rückgangig gemacht werden!";
    this.deleteModal.onDelete(type, title, body, id);
    this.deleteId = id;
  }


  /**
   * Cancels edit user component
   */
  cancel() {
    this.messageService.setSuccessMessage('Bearbeitung abgebrochen.');
    this.router.navigate(['/users']);
  }

}
