import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Students } from '../Models/Students';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentslistService {

  private Url = environment.APIBASEURL + 'Student/GetAllStudent';
  private DeleteStdnt = environment.APIBASEURL + 'Student/DeleteStudent';

  constructor(private http: HttpClient) { }

  GetAllStudents(){
    return this.http.get<Students[]>(this.Url,httpOptions)
  }

  DeleteStudent(id:number){
    return this.http.post<void>(this.DeleteStdnt + "/"+id,httpOptions)
  }
}
