import { StaffMaster,TeacherCourse } from 'shared/Model/StaffMaster';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Courses, CourseType, Roles } from 'shared/Model/Students';
import { User } from 'shared/Model/User';
import { Utils } from '../../Core/Utils';


@Injectable({
  providedIn: 'root'
})

export class StaffService {
  listCourseType: CourseType[];
  listCourses: Courses[];
  listTeacherCourse: TeacherCourse[];
  staffList: any;
  roleList: Roles[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllStaff(InstituteId: number, BranchId: number) {
    return this.http.get<StaffMaster[]>(environment.APIBASEURL + 'Teacher/GetAllTeacher' + '/' + InstituteId + '/' + BranchId, Utils.getAuthHeader())
      .pipe(map(StaffMaster => {
        console.log(StaffMaster);
        return StaffMaster;
      }));

  }

  
  getStaffDetails(id) {
    return this.http.get<StaffMaster>(environment.APIBASEURL + 'Teacher/GetTeacher/' + id, Utils.getAuthHeader())
      .pipe(map(StaffMaster => {
        console.log(StaffMaster);
        return StaffMaster;
      }));
  }
  updateStaff(staffMaster): Observable<StaffMaster> {
    return this.http.post<StaffMaster>(environment.APIBASEURL + 'Teacher/UpdateTeacher', staffMaster, Utils.getAuthHeader())
      .pipe(
        tap((expense: StaffMaster) => console.log(`added staffid=${staffMaster.StaffId}`)),
        catchError(this.handleError<StaffMaster>('updateStaff'))
      );
  }

  deleteStaff(id: number) {
    return this.http.post<StaffMaster>(environment.APIBASEURL + 'Teacher/DeleteTeacher/' + id, null, Utils.getAuthHeader()).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<StaffMaster>('deleteStaff'))
    );
  }
  errorHandler(errorHandler: any) {
    throw new Error("Method not implemented.");
  }

  getAllCourseType() {
    this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result => this.listCourseType = result as CourseType[])
  }

  getCourseName(id) {
    this.http.get(environment.APIBASEURL + 'Student/GetCourseNameFromCourseType' + '/' + id).toPromise().then(result => this.listCourses = result as Courses[])
  }

  getTeacherCourses(id) {
    this.http.get(environment.APIBASEURL + 'Teacher/GetTeacherCourses' + '/' + id).toPromise().then(result => this.listTeacherCourse = result as TeacherCourse[])
  }

  postPhoto(formData) {
    return this.http.post<any>(environment.APIBASEURL + 'Upload/PostUserImage', formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  uploadFile(formData) {
    return this.http.post<any>(environment.APIBASEURL + 'Upload/PostFile', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  saveStaff(staffMaster): Observable<StaffMaster> {
    return this.http.post<StaffMaster>(environment.APIBASEURL + 'Teacher/CreateTeacher', staffMaster, Utils.getAuthHeader())
      .pipe(
        tap((staffMaster: StaffMaster) => console.log('added id=${staffMaster.StaffId}')),
        catchError(this.handleError<StaffMaster>('staffMaster'))
      );
  }
 
  addTeacherCourses(teacherCourse) {
    return this.http.post<TeacherCourse>(environment.APIBASEURL + 'Teacher/AddTeacherCourses', teacherCourse, Utils.getAuthHeader())
      .pipe(
        tap((teacherCourse: TeacherCourse) => console.log('added id=${teacherCourse.TeacherId}')),
        catchError(this.handleError<TeacherCourse>('teacherCourse'))
      );
  }

  getRoleList() {
    return this.http.get(environment.APIBASEURL + 'Student/GetRolesList', Utils.getAuthHeader()).pipe(map(data => data as Roles[]))
  }

  addStaffInUsers(user) {
    return this.http.post<User>(environment.APIBASEURL + 'Login/CreateNewUser', user, Utils.getAuthHeader())
      .pipe(
        tap((user: User) => console.log('added id=${user.Id}')),
        catchError(this.handleError<User>('user'))
      );
  }
}
