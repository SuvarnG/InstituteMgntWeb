import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Leaves } from 'shared/Model/leaves';
import { LeaveTransaction, LeaveType } from 'shared/Model/LeaveTran';
import { Students, CourseType } from 'shared/Model/Students'
import { Observable } from 'rxjs';
import { Utils } from '../../Core/Utils';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  getLeave() {
    return this.http.get<LeaveTransaction[]>(environment.APIBASEURL + 'Leave/GetAllLeaves', Utils.getAuthHeader()
    ).pipe(map(data => {
      return data as LeaveTransaction[];
    }));
  }
 
  createLeave(leave) {
    return this.http.post<LeaveTransaction>(environment.APIBASEURL + 'Leave/CreateLeave', leave, Utils.getAuthHeader());
  }

  getStudentName(id) {
    return this.http.get<Students[]>(environment.APIBASEURL + 'Student/GetStudentsByCourse/' + id, Utils.getAuthHeader()
    ).pipe
      (map(data => {
        return data as Students[]
      }));
  }

  editLeave(leave) {
    return this.http.post(environment.APIBASEURL + 'Leave/UpdateLeave', leave, Utils.getAuthHeader());
  }
}