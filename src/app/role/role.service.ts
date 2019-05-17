import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Roles } from '../Model/Roles'
import { map, catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private Url = environment.APIBASEURL + 'Role/GetAll';
  private deleteUrl = environment.APIBASEURL + 'Role/DeleteRole/';
  private createUrl = environment.APIBASEURL + 'Role/CreateRole';
  private UpdateUrl = environment.APIBASEURL + 'Role/UpdateRole';

  constructor(private http: HttpClient) { }

  roleList() {
    return this.http.get<Roles[]>(this.Url, httpOptions)
      .pipe(map(role => {
        return role;
      }));
  }


  deleteRole(roleID):Observable<Roles>{

    return this.http.post<Roles>(this.deleteUrl + roleID, httpOptions).pipe(
      tap(_ => console.log(`deleted role id=${roleID}`))
   
  );
}  
  
CreateRole(RoleName:string):Observable<Roles>{
   
    return this.http.post<Roles>(this.createUrl + "/" + RoleName, httpOptions).pipe(
      tap(_ => console.log(`created role RoleName=${RoleName}`))
    
  );
}  

EditRole(role):Observable<Roles>{
   
  return this.http.post<Roles>(this.UpdateUrl,role, httpOptions).pipe(
    tap((role:Roles)=>console.log('Update RoleID=${role.rOleId}'))
  
);
}  
}

