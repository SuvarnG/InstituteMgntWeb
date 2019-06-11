import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { StaffMaster, TeacherCourse } from '../Model/StaffMaster';
import { tap, catchError, map } from 'rxjs/operators';
import { Courses, CourseType, Roles } from '../Models/Students';
import { User } from '../Models/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TeacherCoursesService {
  listCourseType: CourseType[];
  listCourses: Courses[];
  roleList: Roles[];
  public thumbnailUrl:any='../../assets/images/MProfile.jpg';
  public Url = environment.APIBASEURL + 'Teacher/CreateTeacher';
  apiUrl=environment.APIBASEURL +'Upload/PostUserImage';
  private uploadUrl=environment.APIBASEURL+'Upload/PostUserImage'

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  // uploadPhoto(formData)
  // {
  //   return this.http.post<any>(this.apiUrl, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }


  uploadFile(formData)
  {
    return this.http.post<any>(environment.APIBASEURL +'Upload/PostFile', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  saveStaff(staffMaster): Observable<StaffMaster> {
    debugger;
    return this.http.post<StaffMaster>(environment.APIBASEURL + 'Teacher/CreateTeacher', staffMaster, httpOptions)
      .pipe(
        tap((staffMaster: StaffMaster) => console.log('added id=${staffMaster.StaffId}')),
        catchError(this.handleError<StaffMaster>('staffMaster'))
      );
  }
  getAllCourseType() {
    debugger;
    this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result => this.listCourseType = result as CourseType[])
  }

  getCourseName(id) {
    debugger;
    this.http.get(environment.APIBASEURL + 'Student/GetCourseNameFromCourseType' + '/' + id).toPromise().then(result => this.listCourses = result as Courses[])
  }

  addTeacherCourses(teacherCourse) {
    debugger;
    return this.http.post<TeacherCourse>(environment.APIBASEURL + 'Teacher/AddTeacherCourses', teacherCourse, httpOptions)
      .pipe(
        tap((teacherCourse: TeacherCourse) => console.log('added id=${teacherCourse.TeacherId}')),
        catchError(this.handleError<TeacherCourse>('teacherCourse'))
      );
  }

  getRoleList() {
    debugger;
    this.http.get(environment.APIBASEURL + 'Student/GetRolesList').toPromise().then(result => this.roleList = result as Roles[])
  }

  addStaffInUsers(user) {
    debugger;
    return this.http.post<User>(environment.APIBASEURL + 'Login/CreateNewUser', user, httpOptions)
      .pipe(
        tap((user: User) => console.log('added id=${user.Id}')),
        catchError(this.handleError<User>('user'))
      );
  }


  postPhoto(formData)
  {
    debugger;
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      res=>{
        debugger;
          
          if(res['type']==4){
           this.thumbnailUrl='Http://'+ res['body']['Message'];
           
          }
                        
      }
    )
  }

}
