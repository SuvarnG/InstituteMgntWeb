import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Branch } from 'shared/Model/Branch';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Utils } from '../../Core/Utils';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  getBranches(InstituteId: number) {
    return this.http.get<Branch[]>(environment.APIBASEURL + 'Branch/GetAll' + '/' + InstituteId, Utils.getAuthHeader())
      ;
  }

  createNewBranch(branch): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/CreateBranch', branch, Utils.getAuthHeader())
  }

  editBranch(branch): Observable<Branch> {
    return this.http.post<Branch>(environment.APIBASEURL + 'Branch/UpdateBranch', branch, Utils.getAuthHeader())
  }

  deleteBranch(id){
    return this.http.post(environment.APIBASEURL + 'Branch/DeleteBranch/' + id, null, Utils.getAuthHeader())
  }
}
