import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Students, UpdateStudent } from '../Models/Students';
import { Utils } from '../Utils';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class StudentslistService {

  private Url = environment.APIBASEURL + 'Student/GetAllStudent';
  private DeleteStdnt = environment.APIBASEURL + 'Student/DeleteStudent';
  private EditStnt = environment.APIBASEURL + 'Student/UpdateStudent';

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

 
  getAllStudents(InstituteId: number, BranchId: number) {
    return this.http.get<Students[]>(this.Url + '/' + InstituteId + '/' + BranchId, this.getAuthHeader()).pipe(map(data => data as Students[]))
  }

  deleteStudent(id: number) {
    return this.http.post<void>(this.DeleteStdnt + "/" + id, null, this.getAuthHeader())
  }

  editStudent(student) {
    return this.http.post<UpdateStudent>(this.EditStnt, student, this.getAuthHeader())
  }
}
