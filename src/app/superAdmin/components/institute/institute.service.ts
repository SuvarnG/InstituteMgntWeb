import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Utils } from '../../../Core/Utils';
import { Institutes } from 'shared/Model/Institutes';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  constructor(private http: HttpClient) { }

  getAllInstitutes() {
    return this.http.get<Institutes[]>(environment.APIBASEURL + 'Institute/GetAllInstitutes', Utils.getAuthHeader());
  }

  createInstitute(body) {
    return this.http.post(environment.APIBASEURL + 'Institute/CreateInstitute', body, Utils.getAuthHeader());
  }

  updateInstitute(body) {
    return this.http.post(environment.APIBASEURL + 'Institute/UpdateInstitute', body, Utils.getAuthHeader());
  }

  deleteInstitute(id: number) {
    return this.http.post(environment.APIBASEURL + 'Institute/InactivateInstitute' + '/' + id, null, Utils.getAuthHeader());
  }

}
