import { User } from './models/User';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Utils {
    constructor() { }
    private static userKey = 'CurrentUser';
    public static SetUserInCookies(user: User) {
        sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }

    public static GetCurrentUser() {
        return sessionStorage.getItem(this.userKey);
    }

    public static ClearUserSession() {
        sessionStorage.removeItem(this.userKey);
    }

}