import { Utils } from './../Utils';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Students,CreateStudent,FeesTransactions, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from '../Models/Students';
import { map } from 'rxjs/operators';
import { debug } from 'util';


@Injectable({
  providedIn: 'root'
})
export class FeesTransactionService {
  public listCourseType: CourseType[];
  public listCourses:Courses[];
  public listStudents:Students[];
  public listCourseFees:CourseFees;
  public listUsers:Users[];
  public listFeesTransactions:FeesTransactions[];
  private FeesTransactionUrl = environment.APIBASEURL+'Bank/SaveFeesTransaction'

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

  getStudentListFromCourseName(id)
  {
    return this.http.get(environment.APIBASEURL+'Student/GetStudentsByCourse'+'/'+id,this.getAuthHeader()).pipe(map(data => data as Students[]))
  }

  getTotalFeesForStudentCourse(id:number)
  { 
    debugger;
    return this.http.get(environment.APIBASEURL+'Student/GetTotalFeesForStudentCourse'+'/'+id,this.getAuthHeader()).pipe(map(data => data as CourseFees[]))
  }

  getFeesTransactionDetails(id:number)
  {
    return this.http.get(environment.APIBASEURL+'Student/GetAllFeesTransaction'+'/'+id,this.getAuthHeader()).pipe(map(data => data as FeesTransactions[]))
  }

  getUsersListForFeesTaken()
  {
    return this.http.get(environment.APIBASEURL+'Student/GetUsersListForFeesTaken',this.getAuthHeader()).pipe(map(data => data as Users[]))
  }

  createStudentCourse(feesTransactions:FeesTransactions)
  {
    return this.http.post<FeesTransactions>(this.FeesTransactionUrl,feesTransactions,this.getAuthHeader())//.subscribe()
  }
}
