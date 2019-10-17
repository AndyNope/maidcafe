import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getUsers', {
    });
  }
  deleteUser(id: number): Observable<any> {
    return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=deleteUser&id=' + id, { responseType: 'json' });
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getUserById&id=' + id, { responseType: 'json' });
  }
  getRoleList(): Observable<any> {
    return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getRole', { responseType: 'json' });
  }
  saveUser(id: number, username: string, email: number, password: string, role: string): Observable<any> {
    return this.http.post<User>('https://maid-cafe.ch/controller.php?mode=saveUser', {
      id: id,
      username: username,
      email: email,
      password: password,
      role: role
    });
  }
}
