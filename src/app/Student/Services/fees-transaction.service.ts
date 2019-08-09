import { Utils } from '../../Core/Utils';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Students,CreateStudent,FeesTransactions, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from 'shared/Model/Students';
import { map } from 'rxjs/operators';


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

  getStudentListFromCourseName(id)
  {
    return this.http.get(environment.APIBASEURL+'Student/GetStudentsByCourse'+'/'+id,Utils.getAuthHeader()).pipe(map(data => data as Students[]))
  }

  getTotalFeesForStudentCourse(id:number)
  { 
    return this.http.get(environment.APIBASEURL+'Student/GetTotalFeesForStudentCourse'+'/'+id,Utils.getAuthHeader()).pipe(map(data => data as CourseFees[]))
  }

  getFeesTransactionDetails(id:number)
  {
    return this.http.get(environment.APIBASEURL+'Student/GetAllFeesTransaction'+'/'+id,Utils.getAuthHeader()).pipe(map(data => data as FeesTransactions[]))
  }

  createStudentCourse(feesTransactions:FeesTransactions)
  {
    return this.http.post<FeesTransactions>(this.FeesTransactionUrl,feesTransactions,Utils.getAuthHeader())//.subscribe()
  }

  getMonthwiseIncome(id:number){
    return this.http.post(environment.APIBASEURL+'Chart/GetMonthWiseIncome'+'/'+id,null,Utils.getAuthHeader()).pipe(map(data => data as FeesTransaction[]))
  }

  getCurrentMonthCoursewiseIncome(id:number){
    return this.http.post(environment.APIBASEURL+'Chart/GetCurrentMonthCoursewiseIncome'+'/'+id,null,Utils.getAuthHeader()).pipe(map(data => data as FeesTransaction[]))
  }

}
