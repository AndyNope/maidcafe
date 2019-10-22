import { UserIdleService } from 'angular-user-idle';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

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
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
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
    constructor(private http: HttpClient, private userIdle: UserIdleService) {
        if(this.user === null){
            this.getUserSession().subscribe(value => {
                this.user = value !== null ? value : null;
            });
            this.loggedIn = true;
        }
    }

    /**
     * Inits auth service
     */
    init() {
        this.userIdle.onTimerStart().subscribe(count => { console.log(count); this.loggedIn = true; });
        this.userIdle.onTimeout().subscribe(() => { console.log('Time is up!'); this.logout(); });
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
        return this.http.post<AuthRespondsData>('https://maid-cafe.ch/controller.php?mode=login', {
            username: username,
            password: password
        });
    }

    /**
     * Gets user session
     * @returns user session 
     */
    getUserSession(): Observable<any> {
        return this.http.get<User>('https://maid-cafe.ch/controller.php?mode=getUserSession', {});
    }

    /**
     * Logouts auth service
     * @returns logout 
     */
    logout(): Observable<any> {
        //return this.http.post<AuthRespondsData>('/controller.php?mode=logout', {});
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