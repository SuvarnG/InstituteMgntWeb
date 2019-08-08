import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Utils } from './../Utils';
import { Institutes } from '../shared/Model/Institutes';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

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

  getAllInstitutes(){
    return this.http.get<Institutes[]>(environment.APIBASEURL + 'Institute/GetAllInstitutes', this.getAuthHeader());
  }

  createInstitute(body){
    return this.http.post(environment.APIBASEURL + 'Institute/CreateInstitute', body, this.getAuthHeader());
  }

  updateInstitute(body){
    return this.http.post(environment.APIBASEURL + 'Institute/UpdateInstitute', body, this.getAuthHeader());
  }

  deleteInstitute(id:number){
    return this.http.post(environment.APIBASEURL + 'Institute/InactivateInstitute' + '/' + id,null, this.getAuthHeader());
  }

}
