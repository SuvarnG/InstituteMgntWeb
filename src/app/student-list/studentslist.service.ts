import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Students, UpdateStudent } from '../Models/Students';
import { Utils } from '../Utils';
import { map } from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'Authorization': `Bearer ${Utils.GetAccessToken()}` 
                            })
};

@Injectable({
  providedIn: 'root'
})
export class StudentslistService {

  private Url = environment.APIBASEURL + 'Student/GetAllStudent';
  private DeleteStdnt = environment.APIBASEURL + 'Student/DeleteStudent';
  private EditStnt = environment.APIBASEURL + 'Student/UpdateStudent';

  constructor(private http: HttpClient) { }

  getAllStudents(InstituteId:number,BranchId:number){
    return this.http.get<Students[]>(this.Url+'/'+ InstituteId +'/'+ BranchId,httpOptions).pipe(map(data => data as Students[]))
  }

  deleteStudent(id:number){
    return this.http.post<void>(this.DeleteStdnt + "/"+id,httpOptions)
  }

  editStudent(student:UpdateStudent){
    debugger;
    return this.http.post<UpdateStudent>(this.EditStnt,student,httpOptions)
  }
}
