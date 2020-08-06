import { UserIdleService } from 'angular-user-idle';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

interface AuthRespondsData {
    username: string;
    password: string;
}


/**
 * Injectable
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    authChanged = new EventEmitter<boolean>();
    public loggedIn = false;
    user: User = null;
    isAuthenticated() {
        const promise = new Promise(
            (resolve) => {
                setTimeout(() => {
                    this.checkLogin().subscribe((val) => {
                        resolve(val);
                    });
                }, 0);
            }
        );
        return promise;
    }

    /**
     * Creates an instance of auth service.
     * @param http 
     * @param userIdle 
     */
    constructor(
        private http: HttpClient,
        private userIdle: UserIdleService,
        private router: Router
    ) {
        this.init();
    }

    /**
     * Inits auth service
     */
    init() {
        if (this.user === null) {
            this.getUserSession().subscribe(value => {
                this.user = value !== null ? value : null;
            });

        }
        this.loggedIn = this.getLogin();
        if (this.user !== null) {
            this.loggedIn = true;
        }
        if (this.loggedIn) {
            this.userIdle.stopTimer();
            this.startWatching();
            this.userIdle.onTimerStart().subscribe(count => {
                console.log(count);
                this.loggedIn = true;
            });
            this.userIdle.onTimeout().subscribe(() => {
                console.log('Time is up!');
                this.setUser(null);
                this.router.navigate(['/logout']);
            });
        }
    }
    /**
     * Gets login
     * @returns  
     */
    getLogin() {
        return this.user === null ? false : true;
    }
    /**
     * Gets role
     * @returns  
     */
    getRole() {
        return this.user === null ? 0 : this.user.role;
    }

    /**
     * Logins auth service
     * @param username 
     * @param password 
     * @returns login 
     */
    login(username: string, password: string): Observable<any> {
        this.startWatching();
        return this.http.post<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=login', {
            username: username,
            password: password
        });
    }


    /**
     * Requests a new password
     * @param email 
     */
    requestNewPassword(email: string): Observable<string> {
        return this.http.post<string>('https://maid-cafe.ch/controller.php?mode=forgotPassword', {
            email: email
        });
    }
    checkLogin(): Observable<any> {
        return this.http.get<any>('https://maid-cafe.ch/controller.php?mode=checkLogin');
    }

    /**
     * Gets user session
     * @returns user session 
     */
    getUserSession(): Observable<any> {
        return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getUserSession', {});
    }
    getUsername() {
        return this.user.username;
    }
    /**
     * Logouts auth service
     * @returns logout 
     */
    logout(): Observable<User> {
        return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=logout', {});
    }

    /**
     * Sets login false
     */
    setLoginFalse() {
        this.loggedIn = false;
    }

    /**
     * Sets user
     * @param user 
     */
    setUser(user: User) {
        this.loggedIn = user !== null ? true : false;
        this.user = user;
    }

    /**
     * Stops auth service
     */
    stop() {
        this.userIdle.stopTimer();
    }

    /**
     * Stops watching
     */
    stopWatching() {
        this.userIdle.stopWatching();
    }

    /**
     * Starts watching
     */
    startWatching() {
        console.log('is watching');
        this.userIdle.startWatching();
    }

    /**
     * Restarts Timer
     */
    restart() {
        this.userIdle.resetTimer();
    }
}