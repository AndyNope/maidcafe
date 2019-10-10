import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/user.model';
import { UserService } from 'src/shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(value => {
      console.log('Result: ');
      console.log(value);
      this.users = value;
    });
  }

  ngOnInit() {

  }

}
