import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UserIdleService } from 'angular-user-idle';
import { logging } from 'protractor';

interface AuthRespondsData {
    username: string;
    password: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    authChanged = new EventEmitter<boolean>();
    public loggedIn = false;
    user: User = null;
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
    constructor(private http: HttpClient, private userIdle: UserIdleService) {
        if (this.user === null) {
            this.getUserSession().subscribe(value => {
                this.user = value !== null ? value : null;
            });
            console.log(this.user);
            this.loggedIn = true;
        }
    }

    init() {
        this.userIdle.onTimerStart().subscribe(count => { console.log(count); this.loggedIn = true; });
        this.userIdle.onTimeout().subscribe(() => { console.log('Time is up!'); this.logout(); });
    }
    getLogin() {
        return this.user !== null ? true : false;
    }
    getRole() {
        return this.user !== null ? this.user.role : 0;
    }
    login(username: string, password: string): Observable<any> {
        return this.http.post<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=login', {
            username: username,
            password: password
        });
    }

    getUserSession(): Observable<any> {
        return this.http.get<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=getUserSession', {});
    }

    logout(): Observable<any> {
        this.stopWatching;
        this.user = null;
        //return this.http.post<AuthRespondsData>('/controller.php?mode=logout', {});
        return this.http.get<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=logout', {});
    }

    setLoginFalse() {
        this.loggedIn = false;
    }

    setUser(user: User) {
        this.loggedIn = true;
        this.user = user;
    }

    stop() {
        this.userIdle.stopTimer();
    }

    stopWatching() {
        this.userIdle.stopWatching();
    }

    startWatching() {
        console.log('is watching');
        this.userIdle.startWatching();
    }

    restart() {
        this.userIdle.resetTimer();
    }
}