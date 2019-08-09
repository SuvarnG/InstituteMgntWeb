import { Utils } from '../../Core/Utils';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CourseType } from 'shared/Model/CourseType';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursetypeService {
  private Url = environment.APIBASEURL + 'Course/GetAllCourseType';
  private CreateUrl = environment.APIBASEURL + 'Course/CreateCourseType';
  private UpdateUrl = environment.APIBASEURL + 'Course/UpdateCourseType';

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
  
  courseTypeList() {
    return this.http.get<CourseType[]>(this.Url, this.getAuthHeader());
      
  }
  createCourseType(CourseTypeName:string){
    let body:CourseType={
      CourseTypeId:0,
      CourseTypeName:CourseTypeName
    }
   return this.http.post<void>(this.CreateUrl,body,this.getAuthHeader())
  }

  editCourseType(coursetype):Observable<CourseType>{
   
    return this.http.post<CourseType>(this.UpdateUrl,coursetype, this.getAuthHeader()).pipe(
      tap((coursetype:CourseType)=>console.log('Update CourseTypeId=${coursetype.CourseTypeId}'))
    
  );
}
}
