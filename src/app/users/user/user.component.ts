import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/user.model';
import { UserService } from 'src/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsers().subscribe(value => {
      console.log('Result: ');
      console.log(value);
      this.users = value;
    });
  }

  ngOnInit() {

  }
  onEditUser(id: number) {
    this.router.navigate(['edit-user/' + id]);
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(value => {
      if(value === 'deleted'){
        this.router.navigate(['/users'])
      }
      console.log(value);
    }, error => {
      console.log(error);
    });
  }

}
