import { promise } from "protractor";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

interface AuthRespondsData{
    username: string;
    password: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    loggedIn = false;
    user:User;
    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800);
            }
        );
        return promise;
    }
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any>{
        return this.http.post<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=login',{
            username: username,
            password: password
        });
    }
    setUser(user:User){
        this.loggedIn = true;
        this.user = user;
    }
}