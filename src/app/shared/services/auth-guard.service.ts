import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';
import { MessageService } from './message.service';

/**
 * Injectable
 */
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    /**
     * Creates an instance of auth guard.
     * @param authService 
     * @param router 
     */
    constructor(
        private authService: AuthService,
        private router: Router,
        private message: MessageService
    ) { }

    /**
     * autentificate the user
     * @param route 
     * @param state 
     * @returns activate 
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        let islogged = false;
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/']);
            this.authService.logout().subscribe(() => {
                console.log('logout');
                this.authService.setLoginFalse();
                this.authService.stopWatching();
                this.authService.setUser(null);
            });
            this.message.setNegativeMessage('Sie haben für diese Seite keine Berechtigung.');
        }
        return islogged;
    }
    /**
     * autentificate the user in child component
     * @param route 
     * @param state 
     * @returns activate child 
     */
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}