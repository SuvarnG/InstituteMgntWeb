import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LeaveTransaction, LeaveType } from 'shared/Model/LeaveTran';
import { Students, CourseType } from 'shared/Model/Students'
import { Utils } from '../../Core/Utils';
import { Leaves, UpdateLeaves } from 'shared/Model/leaves'

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  private Url = environment.APIBASEURL + 'Leave/GetAllLeaveType';
  private DeleteUrl = environment.APIBASEURL + 'Leave/DeleteLeaveType';
  private CreateUrl = environment.APIBASEURL + 'Leave/CreateNewLeaveType';
  private UpdateUrl = environment.APIBASEURL + 'Leave/UpdateLeaveType';

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

  getAllLeavesType() {
    return this.http.get<Leaves[]>(this.Url, Utils.getAuthHeader())
  }

  deleteLeaveType(id: number) {
    return this.http.post<void>(this.DeleteUrl + "/" + id, null, Utils.getAuthHeader())
  }

  createLeaveType(leaveName: string) {
    return this.http.post<void>(this.CreateUrl + "/" + leaveName, null, Utils.getAuthHeader())
  }

  updateLeaveType(leaves: Leaves) {
    return this.http.post<void>(this.UpdateUrl, leaves, Utils.getAuthHeader())
  }

}