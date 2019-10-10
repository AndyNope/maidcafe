import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
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
  saveUser(id: number, name: string, price: number, description: string, image: string): Observable<any> {
    return this.http.post<User>('https://maid-cafe.ch/controller.php?mode=saveUser', {
      id: id,
      name: name,
      price: price,
      description: description,
      image: image
    });
  }
}
