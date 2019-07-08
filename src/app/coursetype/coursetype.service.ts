import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CourseType } from '../Model/CourseType';
import { Observable } from 'rxjs';
import { Utils } from '../Utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Authorization': `Bearer ${Utils.GetAccessToken()}` })
};

@Injectable({
  providedIn: 'root'
})
export class CoursetypeService {
  private Url = environment.APIBASEURL + 'Course/GetAllCourseType';
  private CreateUrl = environment.APIBASEURL + 'Course/CreateCourseType';
  private UpdateUrl = environment.APIBASEURL + 'Course/UpdateCourseType';

  constructor(private http: HttpClient) { }
  
  courseTypeList() {
    return this.http.get<CourseType[]>(this.Url, httpOptions);
      
  }
  createCourseType(CourseTypeName:string){
    let body:CourseType={
      CourseTypeId:0,
      CourseTypeName:CourseTypeName
    }
   return this.http.post<void>(this.CreateUrl,body,httpOptions)
  }

  editCourseType(coursetype):Observable<CourseType>{
   
    return this.http.post<CourseType>(this.UpdateUrl,coursetype, httpOptions).pipe(
      tap((coursetype:CourseType)=>console.log('Update CourseTypeId=${coursetype.CourseTypeId}'))
    
  );
}
}
