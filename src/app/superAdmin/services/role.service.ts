import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Roles } from 'shared/Model/Roles'
import { map, catchError, tap } from 'rxjs/operators';
import { Utils } from '../../Core/Utils';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private Url = environment.APIBASEURL + 'Role/GetAll';
  

  constructor(private http: HttpClient) { }

  roleList() {
    return this.http.get<Roles[]>(this.Url, Utils.getAuthHeader())
      .pipe(map(role => {
        return role;
      }));
  }

}

