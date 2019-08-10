import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from '../../Core/Utils';
import { environment } from '../../../environments/environment';
import { InstituteAdmins } from 'shared/Model/Institutes'
import { Institutes } from 'shared/Model/Institutes';

@Injectable({
  providedIn: 'root'
})
export class InstituteAdminService {

  private uploadUrl = environment.APIBASEURL + 'Upload/PostUserImage'

  constructor(private httpClient: HttpClient) { }

  getAllInstitutes() {
    return this.httpClient.get<Institutes[]>(environment.APIBASEURL + 'Institute/GetAllInstitutes', Utils.getAuthHeader());
  }

  createInstitute(body) {
    return this.httpClient.post(environment.APIBASEURL + 'Institute/CreateInstitute', body, Utils.getAuthHeader());
  }

  updateInstitute(body) {
    return this.httpClient.post(environment.APIBASEURL + 'Institute/UpdateInstitute', body, Utils.getAuthHeader());
  }

  deleteInstitute(id: number) {
    return this.httpClient.post(environment.APIBASEURL + 'Institute/InactivateInstitute' + '/' + id, null, Utils.getAuthHeader());
  }

  getAllInstituteAdmins() {
    return this.httpClient.get<InstituteAdmins[]>(environment.APIBASEURL + 'Institute/GetAllInstitutesAdmin', Utils.getAuthHeader())
  }

  createInstituteAdmin(body) {
    return this.httpClient.post(environment.APIBASEURL + 'Institute/CreateInstituteAdmin', body, Utils.getAuthHeader());
  }

  updateInstituteAdmin(body) {
    return this.httpClient.post(environment.APIBASEURL + 'Institute/UpdateInstitutesAdmin', body, Utils.getAuthHeader());
  }

  deleteInstituteAdmin(id: number) {
    return this.httpClient.post(environment.APIBASEURL + 'Institute/InactivateInstituteAdmin' + '/' + id, null, Utils.getAuthHeader());
  }

  postPhoto(formData) {
    return this.httpClient.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  validatingExistingUserEmail(EmailId: string) {
    return this.httpClient.post(environment.APIBASEURL + 'Institute/ValidatingExistingUserEmail' + '/' + EmailId + '/', null, Utils.getAuthHeader());
  }

}
