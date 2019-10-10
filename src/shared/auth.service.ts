import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

interface AuthRespondsData {
    username: string;
    password: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    authChanged = new EventEmitter<boolean>();
    public loggedIn = false;
    user: User;
    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 0);
            }
        );
        return promise;
    }
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=login', {
            username: username,
            password: password
        });
    }
    logout(): Observable<any> {
        //return this.http.post<AuthRespondsData>('/controller.php?mode=logout', {});
        return this.http.get<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=logout',{});
    }
    setLoginFalse() {
        this.loggedIn = false;
    }
    setUser(user: User) {
        this.loggedIn = true;
        this.user = user;
    }
}