import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Branch } from '../Model/Branch';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Utils } from '../Utils';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Utils.GetAccessToken()}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  getBranches(InstituteId: number) {
    return this.http.get<Branch[]>(environment.APIBASEURL + 'Branch/GetAll' + '/' + InstituteId, httpOptions)
      ;
  }

  createNewBranch(branch): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/CreateBranch', branch, httpOptions)
  }

  editBranch(branch): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/UpdateBranch', branch, httpOptions)
  }

  deleteBranch(id): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/DeleteBranch/' + id, httpOptions)
  }
}
