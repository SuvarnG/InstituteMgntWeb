import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EnquiryList, CourseTypeMaster, CourseNameMaster } from 'shared/Model/EnquiryList';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { createEnquiry } from 'shared/Model/createEnquiry';
import { Utils } from '../../Core/Utils';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private Url = environment.APIBASEURL + 'Enquiry/GetAll';

  constructor(private http: HttpClient) { }

  getEnquiry(id:number) {
    return this.http.get<EnquiryList[]>(this.Url + '/' + id, Utils.getAuthHeader()
    ).pipe(map(data => data as EnquiryList[]));
  }

  createEnquiry(Enquiry: createEnquiry) {
    return this.http.post<createEnquiry>(environment.APIBASEURL + 'Enquiry/CreateEnquiry', Enquiry, Utils.getAuthHeader());
  }

  EnquiryUpdate(enquiries: createEnquiry) {
    return this.http.post(environment.APIBASEURL + 'Enquiry/UpdateEnquiry', enquiries, Utils.getAuthHeader());
  }
}




