import { Observable, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User, UserEdit } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * Gets users
   * @returns users
   */
  getUsers(): Observable<any> {
    return this.http.get<any>('https://maid-cafe.ch/controller.php?mode=getUsers', {});
  }


  /**
   * Gets amount user statistics
   * @returns amount user statistics
   */
  getAmountUserStatistics(): Observable<any> {
    return this.http.get<any>('https://maid-cafe.ch/controller.php?mode=getCountUser', {});
  }

  /**
   * Gets traffic of weekdays
   * @returns traffic of weekdays
   */
  getTrafficOfWeekdays(): Observable<any> {
    return this.http.get<any>('https://maid-cafe.ch/controller.php?mode=getLogTrafficPerDay', {});
  }

  /**
   * Deletes user
   * @param id
   * @returns user
   */
  deleteUser(id: number): Observable<any> {
    return this.http.post<User>(
      'https://maid-cafe.ch/controller.php?mode=deleteUser', { id }, { observe: 'response' }).pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }), catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
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
   * @param User
   * @returns user
   */
  saveUser(user: UserEdit): Observable<any> {
    return this.http.post<UserEdit>('https://maid-cafe.ch/controller.php?mode=saveUser', user);
  }

  /**
   * Saves profile
   * @param User
   * @returns
   */
  saveProfile(user: UserEdit): Observable<any> {
    return this.http.post<UserEdit>('https://maid-cafe.ch/controller.php?mode=saveProfile', user);
  }
}
