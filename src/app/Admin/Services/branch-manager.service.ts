import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from '../../Utils';
import { BranchManager } from 'shared/Model/Branch';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchManagerService {

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

  getAllBranchManagers(InstituteId:number){
    return this.httpClient.get<BranchManager[]>(environment.APIBASEURL + 'Branch/GetAllBranchManagers'+'/'+InstituteId, this.getAuthHeader());

  }

  createNewBranchManager(body){
    return this.httpClient.post(environment.APIBASEURL + 'Branch/CreateBranchManager', body, this.getAuthHeader());
  }

  editNewBranchManager(body){
    return this.httpClient.post(environment.APIBASEURL+'Branch/EditBranchManager',body,this.getAuthHeader())
  }

  deleteBranchManager(id:number){
    return this.httpClient.post(environment.APIBASEURL + 'Branch/DeleteBranchManager' +'/'+id,null,this.getAuthHeader())
  }


  postPhoto(formData)
  {
    return this.httpClient.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }


}
