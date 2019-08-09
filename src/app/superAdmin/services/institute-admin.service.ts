import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from '../../Core/Utils';
import { environment } from '../../../environments/environment';
import { InstituteAdmins } from 'shared/Model/Institutes'

@Injectable({
  providedIn: 'root'
})
export class InstituteAdminService {

  private uploadUrl = environment.APIBASEURL + 'Upload/PostUserImage'

  constructor(private httpClient: HttpClient) { }

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
    debugger;
    return this.httpClient.post(environment.APIBASEURL + 'Institute/ValidatingExistingUserEmail' + '/' + EmailId + '/', null, Utils.getAuthHeader());
  }

}
