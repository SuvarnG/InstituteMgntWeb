import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EnquiryList, CourseTypeMaster, CourseNameMaster } from '../models/EnquiryList';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { createEnquiry } from '../models/createEnquiry';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
  createEnquires(Enquiry: createEnquiry){
    return this.http.post<createEnquiry>(environment.APIBASEURL + 'Enquiry/CreateEnquiry',Enquiry,httpOptions);
  }
  
   GetCourseTypeList() {
    return this.http.get<CourseTypeMaster[]>(environment.APIBASEURL + 'Course/GetAllCourseType');//.toPromise().then(result => this.listCourseType = result as CourseTypeMaster[])
  }

  GetCourseNameList(id) {
   return this.http.get< CourseNameMaster[]>(environment.APIBASEURL + 'Student/GetCourseNameFromCourseType' + '/' + id);//.toPromise().then(result => this.listCourseName = result as CourseNameMaster[])
  }

  EnquiryUpdate(enquiries:createEnquiry){
    return this.http.post(environment.APIBASEURL + 'Enquiry/UpdateEnquiry', enquiries, httpOptions);
  }
}




