import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * Gets users
   * @returns users 
   */
  getUsers(): Observable<any> {
    return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getUsers', {});
  }

  /**
   * Deletes user
   * @param id 
   * @returns user 
   */
  deleteUser(id: number): Observable<any> {
    return this.http.post<User>(
      'https://maid-cafe.ch/controller.php?mode=deleteUser',
      {
        id: id
      });
  }

  /**
   * Gets user by id
   * @param id 
   * @returns user by id 
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getUserById&id=' + id, { responseType: 'json' });
  }

  /**
   * Gets role list
   * @returns role list 
   */
  getRoleList(): Observable<User> {
    return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getRole', { responseType: 'json' });
  }

  /**
   * Saves user
   * @param id 
   * @param username 
   * @param email 
   * @param password 
   * @param role 
   * @returns user 
   */
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
