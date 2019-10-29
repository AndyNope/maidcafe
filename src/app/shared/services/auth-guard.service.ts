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
    constructor(private authService: AuthService, private router: Router) { }

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
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;
                    } else {
                        this.router.navigate(['/']);
                    }
                }
            );
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