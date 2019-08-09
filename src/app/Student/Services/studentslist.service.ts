import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Students, UpdateStudent, StudentPendingFeesList, FeesTransactions } from 'shared/Model/Students';
import { Utils } from '../../Core/Utils';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class StudentslistService {

  private Url = environment.APIBASEURL + 'Student/GetAllStudent';
  private DeleteStdnt = environment.APIBASEURL + 'Student/DeleteStudent';
  private EditStnt = environment.APIBASEURL + 'Student/UpdateStudent';

  constructor(private http: HttpClient) { }

  getAllStudents(InstituteId: number, BranchId: number) {
    debugger;
    return this.http.get<Students[]>(this.Url + '/' + InstituteId + '/' + BranchId, Utils.getAuthHeader()).pipe(map(data => data as Students[]))
  }

  deleteStudent(id: number) {
    return this.http.post<void>(this.DeleteStdnt + "/" + id, null, Utils.getAuthHeader())
  }

  editStudent(student) {
    return this.http.post<UpdateStudent>(this.EditStnt, student, Utils.getAuthHeader())
  }

  postPhoto(formData) {
    return this.http.post<any>(environment.APIBASEURL + 'Upload/PostUserImage', formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  getAllStudentsPendingFeesDetails(BranchId: number) {
    return this.http.post<StudentPendingFeesList[]>(environment.APIBASEURL + 'Chart/GetNotificationData' + '/' + BranchId, null, Utils.getAuthHeader()).pipe(map(data => data as StudentPendingFeesList[]))
  }

  getFeesTransactionDetails(id: number) {
    debugger;
    return this.http.get(environment.APIBASEURL + 'Student/GetAllFeesTransaction' + '/' + id, Utils.getAuthHeader()).pipe(map(data => data as FeesTransactions[]))
  }

  onSubmitStudentFees(feesTransactions) {
    return this.http.post<FeesTransactions[]>(environment.APIBASEURL + 'Bank/SaveFeesTransaction', feesTransactions, Utils.getAuthHeader())
  }

}
