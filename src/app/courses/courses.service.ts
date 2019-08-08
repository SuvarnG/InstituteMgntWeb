import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Course, CourseType } from '../shared/Model/CourseType';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Utils } from '../Utils';



@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private Url = environment.APIBASEURL + 'Course/GetAllCourse';
  private deleteUrl = environment.APIBASEURL + 'Course/InactiveCourse/';
  private CreateUrl = environment.APIBASEURL + 'Course/CreateCourse';
  private UpdateUrl = environment.APIBASEURL + 'Course/UpdateCourse';

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


  //For displaying all entries
  courseList(InstituteId: number, BranchId: number) {
    return this.http.get<Course[]>(this.Url + '/' + InstituteId + '/' + BranchId, this.getAuthHeader());
  }

  delete(CourseId){
    return this.http.post(this.deleteUrl + CourseId, null, this.getAuthHeader())
    // .pipe(
    //   tap(_ => console.log(`deleted Course id=${CourseId}`))
    // );
  }

  createCourse(course: Course) {
    return this.http.post<Course>(this.CreateUrl, course, this.getAuthHeader()).pipe(map(course => { return course }))
  }

  getShortName(CourseTypeId) {
    return this.http.get(environment.APIBASEURL + 'Course/GetCourseMaster/' + CourseTypeId, this.getAuthHeader()).pipe(map(data => data as Course[]))
  }

  edit(course): Observable<Course> {
    return this.http.post<Course>(this.UpdateUrl, course, this.getAuthHeader()).pipe(
      tap((course: Course) => console.log('Update CourseId=${course.CourseId}'))
    );
  }
}
