import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      'user_id': new FormControl(''),
      'username': new FormControl('')
    });
  }

  onSubmit() {
    console.log('saving');
    this.router.navigate(['/']);
  }
  deleteUser() {
    console.log('deleted');
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
