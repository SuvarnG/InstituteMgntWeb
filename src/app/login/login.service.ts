import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Auth } from '../shared/Model/Auth';
import { Login } from '../shared/loginAuth';
import { User, ResponseData } from '../shared/Model/User';
import { Utils } from './../Utils';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Url = environment.Host + 'token';

  constructor(private http: HttpClient, private router: Router) { }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    debugger;
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("CurrentUser") ? true : false;
  }
  getAuthHeader() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Utils.GetAccessToken()}`
      })
    };

    return httpOptions
  }
  login(username: string, password: string) {
    debugger;
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);
    return this.http.post<Auth>(this.Url, body
    ).pipe(map(auth => {
      if (auth && auth.access_token) {
        this.loggedIn.next(true);
        // store user details and jwt token in session storage to keep user logged in between page refreshes
        localStorage.setItem('CurrentUser', JSON.stringify(auth));
      }
      return auth;
    }));
  }

  resetPassword(email: string) {
    return this.http.get<ResponseData[]>(environment.APIBASEURL + 'Login/ResetPasswordRequest/' + email + '/', httpOptions
    ).pipe
      (map(data => {
        return data as ResponseData[];
      }));
  }


  getUserDetails(id: number) {
    return this.http.get<User>(environment.APIBASEURL + 'Login/GetUserDetails/' + id + '/', this.getAuthHeader()).pipe(map(data => data as User))
  }

  updateUser(user) {
    return this.http.post<User>(environment.APIBASEURL + 'Login/UpdateUser', user, this.getAuthHeader()).pipe();
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/Login']);
  }
  updateUserPassword(body) {
    return this.http.post(environment.APIBASEURL + 'Login/UpdateUserPassword', body, this.getAuthHeader());
  }

}
