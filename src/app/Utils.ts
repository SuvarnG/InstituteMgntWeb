import { User } from './Model/User';
import { Injectable } from '@angular/core';
import { Auth } from './Model/Auth';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor() { }
    private static userKey = 'CurrentUser';
    public static SetUserInCookies(auth: Auth) {
        localStorage.setItem(this.userKey, JSON.stringify(auth));
    }

    public static GetCurrentUser(): Auth {
        return localStorage.getItem(this.userKey) ? JSON.parse(localStorage.getItem(this.userKey)) : null;
    }

    public static ClearUserSession() {
        localStorage.removeItem(this.userKey);
    }

    public static GetAccessToken(): string {
        //console.log(`Token:${this.GetCurrentUser().access_token}`);
        let user = this.GetCurrentUser();
        console.log("Access Token:",user ? user.access_token : null);
        return user ? user.access_token : null;
    }

    // public static GetUserRole(): string {
    //     return this.GetCurrentUser().roles;
    // }
    public static GetUserRole(): string {
        let user = this.GetCurrentUser();
        return user ? user.roles : null;
    }

}