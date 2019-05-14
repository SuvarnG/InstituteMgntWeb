import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Branch } from '../Model/Branch';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  getBranches()
  {
    debugger;
    return this.http.get<Branch[]>(environment.APIBASEURL + 'Branch/GetAll',httpOptions)
    .pipe(map(Branch=>{
      console.log(Branch);
      return Branch;
    }));
  }

  CreateNewBranch(branch):Observable<Branch>{
 debugger;
   return this.http.post<Branch>(environment.APIBASEURL + 'Branch/CreateBranch', branch,httpOptions)
  }

EditBranch(branch):Observable<Branch>{
  return this.http.post<Branch>(environment.APIBASEURL + 'Branch/UpdateBranch', branch,httpOptions)
}
}
