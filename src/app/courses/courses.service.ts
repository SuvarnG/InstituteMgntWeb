import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Course, CourseType } from '../Model/CourseType';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Utils } from '../Utils';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
//'Authorization':`Bearer ${Utils.GetAccessToken()}`
})

};

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private Url = environment.APIBASEURL + 'Course/GetAllCourse';
  private deleteUrl = environment.APIBASEURL + 'Course/InactiveCourse/';
  private CreateUrl = environment.APIBASEURL + 'Course/CreateCourse';
  private UpdateUrl = environment.APIBASEURL + 'Course/UpdateCourse';

  constructor(private http: HttpClient) { }

  //For displaying all entries
  courseList() {
    debugger;
    return this.http.get<Course[]>(this.Url, httpOptions);
}
// Delete(CourseId): Observable<Course> {

//   return this.http.post<Course>(this.deleteUrl + CourseId, httpOptions).pipe(
//     tap(_ => console.log(`deleted Course id=${CourseId}`))
//   );
// }
Delete(ID): Observable<Course> {
debugger;
  return this.http.post<Course>(this.deleteUrl + ID, httpOptions).pipe(
    tap(_ => console.log(`deleted Course id=${ID}`))
  );
}

createCourse(course: Course) {
  return this.http.post<Course>(this.CreateUrl, course, httpOptions).pipe(map(course => { return course }))
}

//for displaying course type
// GetCourseTypeList() {
//   return this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType',httpOptions).pipe(map(data => data as CourseType[]))
// }


GetShortName(CourseTypeId) {

  return this.http.get(environment.APIBASEURL + 'Course/GetCourseMaster/' + CourseTypeId,httpOptions).pipe(map(data => data as Course[]))

}

Edit(course): Observable<Course> {

  return this.http.post<Course>(this.UpdateUrl, course, httpOptions).pipe(
    tap((course: Course) => console.log('Update CourseId=${course.CourseId}'))

  );
}
}
