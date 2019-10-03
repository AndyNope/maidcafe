import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthRespondsData{
    username: string;
    password: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any>{
        return this.http.post<AuthRespondsData>('https://maid-cafe.ch/controller.php',{
            username: username,
            password: password
        });
    }
}