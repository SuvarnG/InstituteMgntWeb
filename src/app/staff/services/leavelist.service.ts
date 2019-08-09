import { Utils } from '../../Core/Utils';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Leaves, UpdateLeaves } from 'shared/Model/leaves'

@Injectable({
  providedIn: 'root'
})
export class LeavelistService {

  private Url = environment.APIBASEURL + 'Leave/GetAllLeaveType';
  private DeleteUrl = environment.APIBASEURL + 'Leave/DeleteLeaveType';
  private CreateUrl = environment.APIBASEURL + 'Leave/CreateNewLeaveType';
  private UpdateUrl = environment.APIBASEURL + 'Leave/UpdateLeaveType';

  constructor(private http: HttpClient) { }

  getAllLeaves() {
    return this.http.get<Leaves[]>(this.Url, Utils.getAuthHeader())
  }

  deleteLeaveType(id: number) {
    return this.http.post<void>(this.DeleteUrl + "/" + id, null, Utils.getAuthHeader())
  }

  createLeave(leaveName: string) {
    return this.http.post<void>(this.CreateUrl + "/" + leaveName, null, Utils.getAuthHeader())
  }

  updateLeave(leaves: Leaves) {
    return this.http.post<void>(this.UpdateUrl, leaves, Utils.getAuthHeader())
  }
}
