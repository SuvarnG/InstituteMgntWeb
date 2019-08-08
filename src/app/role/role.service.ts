import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Roles } from '../shared/Model/Roles'
import { map, catchError, tap } from 'rxjs/operators';
import { Utils } from './../Utils';



@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private Url = environment.APIBASEURL + 'Role/GetAll';
  private deleteUrl = environment.APIBASEURL + 'Role/DeleteRole/';
  private createUrl = environment.APIBASEURL + 'Role/CreateRole';
  private UpdateUrl = environment.APIBASEURL + 'Role/UpdateRole';

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


  roleList() {
    return this.http.get<Roles[]>(this.Url, this.getAuthHeader())
      .pipe(map(role => {
        return role;
      }));
  }


  deleteRole(roleID):Observable<Roles>{

    return this.http.post<Roles>(this.deleteUrl + roleID, this.getAuthHeader()).pipe(
      tap(_ => console.log(`deleted role id=${roleID}`))
   
  );
}  
  
CreateRole(RoleName:string):Observable<Roles>{
   
    return this.http.post<Roles>(this.createUrl + "/" + RoleName, this.getAuthHeader()).pipe(
      tap(_ => console.log(`created role RoleName=${RoleName}`))
    
  );
}  

EditRole(role):Observable<Roles>{
   
  return this.http.post<Roles>(this.UpdateUrl,role, this.getAuthHeader()).pipe(
    tap((role:Roles)=>console.log('Update RoleID=${role.rOleId}'))
  
);
}  
}

