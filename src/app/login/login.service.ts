import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Auth } from '../models/Auth';
import { Utils } from '../Utils';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Url = environment.APIBASEURL + 'Login/Login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // const body= new HttpParams()
    // .set('Email',Email)
    // .set('password',password);
    let body: Auth = {
      Email: email,
      Password: password
    };

    return this.http.post<User>(this.Url, body, httpOptions
    ).pipe(map(user => {
      if (user && user.Email) {
        sessionStorage.setItem('CurrentUser', JSON.stringify(user));
      }
      return user;
    }));
  }

}
