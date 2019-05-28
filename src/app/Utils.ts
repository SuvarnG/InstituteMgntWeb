import { User } from './models/User';
import { Injectable } from '@angular/core';
import { Auth } from './models/Auth';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor() { }
    private static userKey = 'CurrentUser';
    public static SetUserInCookies(auth: Auth) {
        sessionStorage.setItem(this.userKey, JSON.stringify(auth));
    }

    public static GetCurrentUser(): Auth {
        return sessionStorage.getItem(this.userKey) ? JSON.parse(sessionStorage.getItem(this.userKey)) : null;
    }

    public static ClearUserSession() {
        sessionStorage.removeItem(this.userKey);
    }

    public static GetAccessToken(): string {
        return this.GetCurrentUser().access_token;
    }

    public static GetUserRole(): string {
        return this.GetCurrentUser().roles;
    }


}