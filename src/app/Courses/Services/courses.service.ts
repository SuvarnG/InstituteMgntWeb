import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course, CourseType} from 'shared/Model/CourseType';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Utils } from '../../Core/Utils';

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
  courseList(InstituteId: number, BranchId: number) {
    return this.http.get<Course[]>(this.Url + '/' + InstituteId + '/' + BranchId, Utils.getAuthHeader());
  }

  delete(CourseId) {
    return this.http.post(this.deleteUrl + CourseId, null, Utils.getAuthHeader())

  }

  createCourse(course: Course) {
    return this.http.post<Course>(this.CreateUrl, course, Utils.getAuthHeader()).pipe(map(course => { return course }))
  }

  getShortName(CourseTypeId) {
    return this.http.get(environment.APIBASEURL + 'Course/GetCourseMaster/' + CourseTypeId, Utils.getAuthHeader()).pipe(map(data => data as Course[]))
  }

  edit(course): Observable<Course> {
    return this.http.post<Course>(this.UpdateUrl, course, Utils.getAuthHeader()).pipe(
      tap(() => console.log('Update CourseId=${course.CourseId}'))
    );
  }
  courseTypeList() {
    return this.http.get<CourseType[]>(environment.APIBASEURL + 'Course/GetAllCourseType', Utils.getAuthHeader());
      
  }
  createCourseType(CourseTypeName:string){
    let body:CourseType={
      CourseTypeId:0,
      CourseTypeName:CourseTypeName
    }
   return this.http.post<void>(environment.APIBASEURL + 'Course/CreateCourseType',body,Utils.getAuthHeader())
  }

  editCourseType(coursetype):Observable<CourseType>{
   
    return this.http.post<CourseType>(environment.APIBASEURL + 'Course/UpdateCourseType',coursetype, Utils.getAuthHeader()).pipe(
      tap((coursetype:CourseType)=>console.log('Update CourseTypeId=${coursetype.CourseTypeId}'))
    
  );
}
}
