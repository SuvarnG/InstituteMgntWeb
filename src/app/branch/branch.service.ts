import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Branch } from '../Model/Branch';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Utils } from '../Utils';



@Injectable({
  providedIn: 'root'
})
export class BranchService {

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

  getBranches(InstituteId: number) {
    return this.http.get<Branch[]>(environment.APIBASEURL + 'Branch/GetAll' + '/' + InstituteId, this.getAuthHeader())
      ;
  }

  createNewBranch(branch): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/CreateBranch', branch, this.getAuthHeader())
  }

  editBranch(branch): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/UpdateBranch', branch, this.getAuthHeader())
  }

  deleteBranch(id): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/DeleteBranch/' + id, this.getAuthHeader())
  }
}
