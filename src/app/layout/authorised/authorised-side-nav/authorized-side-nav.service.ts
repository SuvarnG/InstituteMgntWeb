import { environment } from './../../../../environments/environment';
import { Utils } from '../../../Utils';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { User } from './../../../shared/model/User';
import { Router } from '@angular/router';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  'Authorization': `Bearer ${Utils.GetAccessToken()}`})
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizedSideNavService {

  private uploadUrl=environment.APIBASEURL+'Upload/PostUserImage';  
  private imageUploadUrl=environment.APIBASEURL+'Login/UploadUserImage'

  constructor(private http: HttpClient,private router:Router) { }


  submitUserImage(body){
    return this.http.post<User>(this.imageUploadUrl,body,httpOptions)
  }

  postPhoto(formData)
  {
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
