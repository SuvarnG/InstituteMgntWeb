import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Leaves,UpdateLeaves} from '../Models/leaves'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeavelistService {

  private Url = environment.APIBASEURL + 'Leave/GetAllLeaves';
  private DeleteUrl = environment.APIBASEURL + 'Leave/DeleteLeaveType';
  private CreateUrl = environment.APIBASEURL + 'Leave/CreateNewLeave';
  private UpdateUrl = environment.APIBASEURL + 'Leave/UpdateLeave';

  constructor(private http: HttpClient) { }

  GetAllLeaves(){
    debugger;
    return this.http.get<Leaves[]>(this.Url,httpOptions)
  }

  DeleteLeaveType(id:number){
    debugger;
    return this.http.post<void>(this.DeleteUrl + "/" + id, httpOptions)
  }

  CreateLeave(leaveName:string){
    return this.http.post<void>(this.CreateUrl + "/" + leaveName,httpOptions)
  }

  UpdateLeave(leaves:Leaves){
    return this.http.post<void>(this.UpdateUrl, leaves , httpOptions)
  }
}
