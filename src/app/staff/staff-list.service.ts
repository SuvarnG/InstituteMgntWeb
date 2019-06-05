import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StaffMaster, TeacherCourse } from 'src/app/Model/StaffMaster';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CourseType, Courses } from '../Models/Students';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class StaffListService {
  private deleteUrl = environment.APIBASEURL + 'Teacher/DeleteTeacher/';
  listCourseType: CourseType[];
  listCourses: Courses[];
  listTeacherCourse: TeacherCourse[];
  staffList: any;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllStaff() {
    debugger;
    return this.http.get<StaffMaster[]>(environment.APIBASEURL + 'Teacher/GetAllTeacher', httpOptions)
      .pipe(map(StaffMaster => {
        console.log(StaffMaster);
        return StaffMaster;
      }));

  }
  getStaffDetails(id){
    debugger;
    return this.http.get<StaffMaster>(environment.APIBASEURL + 'Teacher/GetTeacher/'+id, httpOptions)
      .pipe(map(StaffMaster => {
        console.log(StaffMaster);
        return StaffMaster;
      }));
  }
  updateStaff(staffMaster): Observable<StaffMaster> {
    return this.http.post<StaffMaster>(environment.APIBASEURL + 'Teacher/UpdateTeacher', staffMaster, httpOptions)
      .pipe(
        tap((expense: StaffMaster) => console.log(`added staffid=${staffMaster.StaffId}`)),
        catchError(this.handleError<StaffMaster>('updateStaff'))
      );
  }

  deleteStaff(id): Observable<StaffMaster> {
    return this.http.post<StaffMaster>(this.deleteUrl + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<StaffMaster>('deleteStaff'))
    );
  }
  errorHandler(errorHandler: any) {
    throw new Error("Method not implemented.");
  }

  getAllCourseType() {
    debugger;
    this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result => this.listCourseType = result as CourseType[])
  }

  getCourseName(id) {
    debugger;
    this.http.get(environment.APIBASEURL + 'Student/GetCourseNameFromCourseType' + '/' + id).toPromise().then(result => this.listCourses = result as Courses[])
  }

  getTeacherCourses(id) {
    this.http.get(environment.APIBASEURL + 'Teacher/GetTeacherCourses' + '/' + id).toPromise().then(result => this.listTeacherCourse = result as TeacherCourse[])
  }
}
