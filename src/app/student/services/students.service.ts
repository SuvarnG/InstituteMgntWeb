import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Students, UpdateStudent, StudentPendingFeesList, FeesTransactions, CourseType, Courses, CourseFees, RecentStudent, CreateStudent, FeesTransaction } from 'shared/Model/Students';
import { Utils } from '../../Core/Utils';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class StudentslistService {
  public listCourseType: CourseType[];
  public listCourses: Courses[];
  public listCourseFees: CourseFees[];
  public listRecentStudent: RecentStudent[]
  public NewStudId: unknown;
  public StudentId: number;
  public thumbnailUrl: any = '../../assets/images/MProfile.jpg';
  
  constructor(private http: HttpClient) { }

  getAllStudents(InstituteId: number, BranchId: number) {
    return this.http.get<Students[]>( environment.APIBASEURL + 'Student/GetAllStudent'+ '/' + InstituteId + '/' + BranchId, Utils.getAuthHeader()).pipe(map(data => data as Students[]))
  }

  deleteStudent(id: number) {
    return this.http.post<void>(environment.APIBASEURL + 'Student/DeleteStudent'+ "/" + id, null, Utils.getAuthHeader())
  }

  editStudent(student) {
    return this.http.post<Students>(environment.APIBASEURL + 'Student/UpdateStudent', student, Utils.getAuthHeader())
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
    return this.http.get(environment.APIBASEURL + 'Student/GetAllFeesTransaction' + '/' + id, Utils.getAuthHeader()).pipe(map(data => data as FeesTransactions[]))
  }

  onSubmitStudentFees(feesTransactions) {
    return this.http.post<FeesTransactions[]>(environment.APIBASEURL + 'Bank/SaveFeesTransaction', feesTransactions, Utils.getAuthHeader())
  }
  createNewStudent(students) {
    return this.http.post<Students>(environment.APIBASEURL + 'Student/CreateStudent', students, Utils.getAuthHeader())
  }

  createStudentCourse(feesTransaction) {
    return this.http.post<FeesTransaction>(environment.APIBASEURL + 'Student/SaveOrUpdateFeesTransactionForStudent', feesTransaction, Utils.getAuthHeader())
  }

  getCourseNameFromCourseType(id) {
    return this.http.get(environment.APIBASEURL + 'Student/GetCourseNameFromCourseType' + '/' + id, Utils.getAuthHeader()).pipe(map(data => data as Courses[]))
  }

  getCourseFeesFromCourseName(id) {
    return this.http.get(environment.APIBASEURL + 'Student/GetCourseFeesFromCourseName' + '/' + id, Utils.getAuthHeader()).pipe(map(data => data as CourseFees[]))
  }

  postFile(formData) {
    return this.http.post<any>(environment.APIBASEURL + 'Upload/PostFile', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
