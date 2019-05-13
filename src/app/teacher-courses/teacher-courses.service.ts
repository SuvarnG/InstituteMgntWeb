import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { StaffMaster, TeacherCourse } from '../Model/StaffMaster';
import { tap, catchError } from 'rxjs/operators';
import { Courses, CourseType,Roles } from '../Models/Students';
import {User} from '../Models/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TeacherCoursesService {
  listCourseType:CourseType[];
  listCourses:Courses[];
  roleList:Roles[];
  public Url = environment.APIBASEURL + 'Teacher/CreateTeacher';
  
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  saveStaff(staffMaster): Observable<StaffMaster> {  
    debugger;
    return this.http.post<StaffMaster>(environment.APIBASEURL + 'Teacher/CreateTeacher', staffMaster,httpOptions)  
    .pipe(
      tap((staffMaster: StaffMaster) => console.log('added id=${staffMaster.StaffId}')),
      catchError(this.handleError<StaffMaster>('staffMaster'))
    );
  }  
  GetAllCourseType(){
    debugger;
    this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result=>this.listCourseType = result as CourseType[]) 
  }

  GetCourseName(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetCourseNameFromCourseType'+'/'+id).toPromise().then(result=>this.listCourses = result as Courses[])
  }

  AddTeacherCourses(teacherCourse){
    debugger;
    return this.http.post<TeacherCourse>(environment.APIBASEURL + 'Teacher/AddTeacherCourses', teacherCourse,httpOptions)  
    .pipe(
      tap((teacherCourse: TeacherCourse) => console.log('added id=${teacherCourse.TeacherId}')),
      catchError(this.handleError<TeacherCourse>('teacherCourse'))
    );
  }

  GetRoleList(){
    debugger;
    this.http.get(environment.APIBASEURL + 'Student/GetRolesListForDropDown').toPromise().then(result=>this.roleList = result as Roles[]) 
  }

  AddStaffInUsers(user)
  {
    debugger;
    return this.http.post<User>(environment.APIBASEURL + 'Login/CreateNewUser', user,httpOptions)  
    .pipe(
      tap((user: User) => console.log('added id=${user.Id}')),
      catchError(this.handleError<User>('user'))
    );
  }
}
