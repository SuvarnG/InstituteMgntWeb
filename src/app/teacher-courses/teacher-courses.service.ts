import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { StaffMaster, TeacherCourse } from '../Model/StaffMaster';
import { tap, catchError, map } from 'rxjs/operators';
import { Courses, CourseType, Roles } from '../Model/Students';
import { User } from '../Model/User';
import { Utils } from '../Utils';



@Injectable({
  providedIn: 'root'
})

export class TeacherCoursesService {
  listCourseType: CourseType[];
  listCourses: Courses[];
  roleList: Roles[];
  public thumbnailUrl: any = '../../assets/images/MProfile.jpg';
  public Url = environment.APIBASEURL + 'Teacher/CreateTeacher';
  apiUrl = environment.APIBASEURL + 'Upload/PostUserImage';
  private uploadUrl = environment.APIBASEURL + 'Upload/PostUserImage'

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); 

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


  uploadFile(formData) {
    return this.http.post<any>(environment.APIBASEURL + 'Upload/PostFile', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  saveStaff(staffMaster): Observable<StaffMaster> {
    return this.http.post<StaffMaster>(environment.APIBASEURL + 'Teacher/CreateTeacher', staffMaster, this.getAuthHeader())
      .pipe(
        tap((staffMaster: StaffMaster) => console.log('added id=${staffMaster.StaffId}')),
        catchError(this.handleError<StaffMaster>('staffMaster'))
      );
  }
 
  addTeacherCourses(teacherCourse) {
    return this.http.post<TeacherCourse>(environment.APIBASEURL + 'Teacher/AddTeacherCourses', teacherCourse, this.getAuthHeader())
      .pipe(
        tap((teacherCourse: TeacherCourse) => console.log('added id=${teacherCourse.TeacherId}')),
        catchError(this.handleError<TeacherCourse>('teacherCourse'))
      );
  }

  getRoleList() {
    return this.http.get(environment.APIBASEURL + 'Student/GetRolesList', this.getAuthHeader()).pipe(map(data => data as Roles[]))
  }

  addStaffInUsers(user) {
    return this.http.post<User>(environment.APIBASEURL + 'Login/CreateNewUser', user, this.getAuthHeader())
      .pipe(
        tap((user: User) => console.log('added id=${user.Id}')),
        catchError(this.handleError<User>('user'))
      );
  }

  postPhoto(formData) {
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    })
    // .subscribe(
    //   res => {
    //     if (res['type'] == 4) {
    //       this.thumbnailUrl = 'Http://' + res['body']['Message'];
    //     }
    //   }
    // )
  }
}
