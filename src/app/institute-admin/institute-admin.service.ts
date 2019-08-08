import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from '../Utils';
import { environment } from 'src/environments/environment';
import {InstituteAdmins} from '../shared/Model/Institutes'

@Injectable({
  providedIn: 'root'
})
export class InstituteAdminService {


  private uploadUrl=environment.APIBASEURL+'Upload/PostUserImage'

  constructor(private httpClient:HttpClient) { }

  getAuthHeader(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Utils.GetAccessToken()}`
      })      
    };
    return httpOptions
  }

  getAllInstituteAdmins(){   
    return this.httpClient.get<InstituteAdmins[]>(environment.APIBASEURL+'Institute/GetAllInstitutesAdmin',this.getAuthHeader())
  }

  createInstituteAdmin(body){
    return this.httpClient.post(environment.APIBASEURL + 'Institute/CreateInstituteAdmin', body, this.getAuthHeader());
  }

  updateInstituteAdmin(body){
    return this.httpClient.post(environment.APIBASEURL + 'Institute/UpdateInstitutesAdmin', body, this.getAuthHeader());
  }

  deleteInstituteAdmin(id:number){
    return this.httpClient.post(environment.APIBASEURL + 'Institute/InactivateInstituteAdmin' +'/' + id, null, this.getAuthHeader());
  }

  postPhoto(formData)
  {
    return this.httpClient.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  validatingExistingUserEmail(EmailId:string){
    debugger;
    return this.httpClient.post(environment.APIBASEURL+'Institute/ValidatingExistingUserEmail'+ '/'+ EmailId +'/',null, this.getAuthHeader());
  }
  
}
