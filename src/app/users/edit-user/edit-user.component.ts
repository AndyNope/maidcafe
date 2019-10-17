import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/shared/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  //roleList = { 33: 'helper', 66: 'service', 99: 'admin' };
  roleList = ['helper', 'service', 'admin'];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe(value => {
      console.log(value);
      this.userForm = new FormGroup({
        'user_id': new FormControl(value.id),
        'username': new FormControl(value.username),
        'email': new FormControl(value.email),
        'password': new FormControl(''),
        'password_compare': new FormControl(''),
        'role': new FormControl(value.role)
      });
    });
    //this.userService.getRoleList().subscribe(val=>{this.roleList = val})
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      'user_id': new FormControl('',[Validators.required]),
      'username': new FormControl('',[Validators.required]),
      'email': new FormControl(''),
      'password': new FormControl(''),
      'password_compare': new FormControl(''),
      'role': new FormControl('',[Validators.required])
    });
  }

  onSubmit() {
    //console.log('submit');
    const id = this.userForm.value.user_id;
    const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const password_compare = this.userForm.value.password_compare;
    const role = this.userForm.value.role;
    //console.log(this.userForm.value);
    if (password === password_compare || (password + password_compare) === '') {
      //console.log('in');
      this.userService.saveUser(id, username, email, password, role).subscribe(val => {
        if (val === 'saved') {
          alert('saved');
          this.router.navigate(['/users']);
        }else{
          alert(val);
        }
      });
    } else {
      alert('Both passwords have to match');
    }
  }
  deleteUser() {
    console.log('deleted');
    this.router.navigate(['/users']);
  }

  cancel() {
    this.router.navigate(['/users']);
  }

}
