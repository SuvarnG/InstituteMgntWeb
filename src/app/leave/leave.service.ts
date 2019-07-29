import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Leaves } from '../Model/leaves';
import { LeaveTransaction, LeaveType } from '../Model/LeaveTran';
import { Students, CourseType } from '../Model/Students'
import { Observable } from 'rxjs';
import { Utils } from '../Utils';



@Injectable({
  providedIn: 'root'
})
export class LeaveService {

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

  getLeave() {
    return this.http.get<LeaveTransaction[]>(environment.APIBASEURL + 'Leave/GetAll', this.getAuthHeader()
    ).pipe(map(data => {
      return data as LeaveTransaction[];
    }));
  }

  
  createLeave(leave) {
    return this.http.post<LeaveTransaction>(environment.APIBASEURL + 'Leave/CreateLeave', leave, this.getAuthHeader());
  }

  getStudentName(id) {
    return this.http.get<Students[]>(environment.APIBASEURL + 'Student/GetStudentsByCourse/' + id, this.getAuthHeader()
    ).pipe
      (map(data => {
        return data as Students[]
      }));
  }


  editLeave(leave) {
    return this.http.post(environment.APIBASEURL + 'Leave/UpdateLeaveTransaction', leave, this.getAuthHeader());
  }
}