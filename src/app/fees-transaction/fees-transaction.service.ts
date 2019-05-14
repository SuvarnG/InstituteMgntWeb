import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Students,CreateStudent,FeesTransactions, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from '../Models/Students';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FeesTransactionService {
  public listCourseType: CourseType[];
  public listCourses:Courses[];
  public listStudents:Students[];
  public listCourseFees:CourseFees[];
  public listUsers:Users[];
  private FeesTransactionUrl = environment.APIBASEURL+'Bank/SaveFeesTransaction'

  constructor(private http: HttpClient) { }



  GetAllCourseType(){
    debugger;
    this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result=>this.listCourseType = result as CourseType[]) 
  }

  GetCourseNameFromCourseType(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetCourseNameFromCourseType'+'/'+id).toPromise().then(result=>this.listCourses = result as Courses[])
  }

  GetCourseFeesFromCourseName(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetCourseFeesFromCourseName'+'/'+id).toPromise().then(result=>this.listCourseFees = result as CourseFees[])
  }

  GetStudentListFromCourseName(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetStudentsByCourse'+'/'+id).toPromise().then(result=>this.listStudents=result as Students[] )
  }

  GetUsersListForFeesTaken(){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetUsersListForFeesTaken').toPromise().then(result=>this.listUsers=result as Users[])
  }

  CreateStudentCourse(feesTransactions:FeesTransactions){
    debugger;
    this.http.post<FeesTransactions>(this.FeesTransactionUrl,feesTransactions,httpOptions).subscribe()
  }
}
