import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Leaves } from '../Models/leaves';
import { LeaveTransaction, LeaveType } from '../models/LeaveTran';
import { Students, CourseType } from '../../app/models/Students'
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
export class LeaveService {

  constructor(private http: HttpClient) { }

  getLeave() {
    return this.http.get<LeaveTransaction[]>(environment.APIBASEURL + 'Leave/GetAll', httpOptions
    ).pipe(map(data => {
      return data as LeaveTransaction[];
    }));
  }

  getLeaveTypeList() {
    this.http.get<LeaveType[]>(environment.APIBASEURL + 'Leave/GetAll').pipe(map(data=>{return data as LeaveType[]}))//.toPromise().then(result => this.LeaveType = result as Leaves[])
  }

  createLeave(leave: LeaveTransaction) {
    return this.http.post<LeaveTransaction>(environment.APIBASEURL + 'Leave/CreateLeave', leave, httpOptions);
  }

  getStudentName(id) {
    return this.http.get<Students[]>(environment.APIBASEURL + 'Student/GetStudentsByCourse/' + id , httpOptions
    ).pipe
      (map(data => {
        return data as Students[]
      }));
  }

  getCourseNameByType() {
    return this.http.get(environment.APIBASEURL + 'Leave/GetAllLeaves'
    ).pipe
      (map(data => {
        return data as LeaveType[]
      }));
  }

  editLeave(leave: LeaveTransaction) {
    return this.http.post(environment.APIBASEURL + 'Leave/UpdateLeaveTransaction', leave, httpOptions);
  }
}