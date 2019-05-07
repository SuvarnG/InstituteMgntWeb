import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EnquiryList, CourseTypeMaster } from '../models/EnquiryList';
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
  listEnquiry:EnquiryList[];
  listCourseType: CourseTypeMaster[];
  constructor(private http: HttpClient) { }

  getEnquiry(){
    return this.http.get<EnquiryList[]>(this.Url,httpOptions
      ).pipe(map(EnquiryList=>{
         return EnquiryList;
      }));
  }
      createNewEnquiryService(Enquiry:createEnquiry){
       
        return this.http.post<createEnquiry>(environment.APIBASEURL + 'Enquiry/CreateEnquiry',Enquiry,httpOptions);
      }

      GetCourseTypeList(){
        this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result=>this.listCourseType = result as CourseTypeMaster[])  
      }
    }

  
  

