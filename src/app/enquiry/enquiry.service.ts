import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EnquiryList, CourseTypeMaster, CourseNameMaster } from '../models/EnquiryList';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { createEnquiry } from '../models/createEnquiry';
import { Utils } from '../Utils';


// const httpOptions = {
// headers: new HttpHeaders({ 'Authorization': 'Bearer'+ Utils.GetAccessToken() })

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Utils.GetAccessToken()}`
  })
 };

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private Url = environment.APIBASEURL + 'Enquiry/GetAll';
  //listEnquiry: EnquiryList[];
  //listCourseType: CourseTypeMaster[];
  //listCourseName: CourseNameMaster[];
  constructor(private http: HttpClient) { }

  getEnquiry() {
    return this.http.get<EnquiryList[]>(this.Url, httpOptions
    ).pipe(map(data => data as EnquiryList[]));
  }
  createEnquires(Enquiry: createEnquiry) {
    return this.http.post<createEnquiry>(environment.APIBASEURL + 'Enquiry/CreateEnquiry', Enquiry, httpOptions);
  }

  GetCourseTypeList() {
    return this.http.get<CourseTypeMaster[]>(environment.APIBASEURL + 'Course/GetAllCourseType',httpOptions);//.toPromise().then(result => this.listCourseType = result as CourseTypeMaster[])
  }

  GetCourseNameList(id) {
    let headers = new Headers();
    return this.http.get<CourseNameMaster[]>(environment.APIBASEURL + 'Student/GetCourseNameFromCourseType' + '/' + id, httpOptions);//.toPromise().then(result => this.listCourseName = result as CourseNameMaster[])
  }

  EnquiryUpdate(enquiries: createEnquiry) {
    return this.http.post(environment.APIBASEURL + 'Enquiry/UpdateEnquiry', enquiries, httpOptions);
  }
}




