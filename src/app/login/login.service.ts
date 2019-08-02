import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Auth } from '../Model/Auth';
import { Login } from '../loginAuth';
import { User } from '../Model/User';
import { Utils } from '../Utils';
import { Observable } from 'rxjs';

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
  isAuthenticated: any;

  constructor(private http: HttpClient) { }

  getAuthHeader(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Utils.GetAccessToken()}`
      })      
    };
    
    return httpOptions
  }
  login(username: string, password: string) {
     const body= new HttpParams()
     .set('grant_type', 'password')
     .set('username',username)
     .set('password',password);
    return this.http.post<Auth>(this.Url, body
    ).pipe(map(auth => {
      if (auth && auth.access_token) {
        // store user details and jwt token in session storage to keep user logged in between page refreshes
        localStorage.setItem('CurrentUser', JSON.stringify(auth));
        }
       return auth;
    }));
  }

  resetPassword(email:string){
    return this.http.get<boolean>(environment.APIBASEURL + 'Login/ResetPasswordRequest/'+ email+'/', httpOptions
    ).pipe
    (map(data=>{
      return data as boolean;
    }));
  }

  getUserDetails(id:number){
    return this.http.get<User>(environment.APIBASEURL + 'Login/GetUserDetails/'+ id+'/', this.getAuthHeader()).pipe(map(data => data as User))
  }

  updateUser(user){
    return this.http.post<User>(environment.APIBASEURL + 'Login/UpdateUser', user, this.getAuthHeader()).pipe();
  }

}
