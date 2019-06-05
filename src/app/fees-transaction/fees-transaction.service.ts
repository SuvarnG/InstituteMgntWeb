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
  public listFeesTransactions:FeesTransactions[];
  private FeesTransactionUrl = environment.APIBASEURL+'Bank/SaveFeesTransaction'

  constructor(private http: HttpClient) { }



  // getAllCourseType(){
  //   debugger;
  //   this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result=>this.listCourseType = result as CourseType[]) 
  // }

  GetAllCourses(){
    debugger;
    this.http.get(environment.APIBASEURL + 'Course/GetAllCourses').toPromise().then(result=>this.listCourses = result as Courses[]) 
  }

  // getCourseNameFromCourseType(id){
  //   debugger;
  //   this.http.get(environment.APIBASEURL+'Student/GetCourseNameFromCourseType'+'/'+id).toPromise().then(result=>this.listCourses = result as Courses[])
  // }

  // getCourseFeesFromCourseName(id){
  //   debugger;
  //   this.http.get(environment.APIBASEURL+'Student/GetCourseFeesFromCourseName'+'/'+id).toPromise().then(result=>this.listCourseFees = result as CourseFees[])
  // }

  getStudentListFromCourseName(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetStudentsByCourse/' + id).toPromise().then(result=>this.listStudents=result as Students[] )
  }

  getTotalFeesForStudentCourse(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetTotalFeesForStudentCourse'+'/'+id).toPromise().then(result=>this.listCourseFees = result as CourseFees[])
  }

  getFeesTransactionDetails(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetAllFeesTransaction'+'/'+id).toPromise().then(result=>this.listFeesTransactions=result as FeesTransactions[] )
  }

  getUsersListForFeesTaken(){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetUsersListForFeesTaken').toPromise().then(result=>this.listUsers=result as Users[])
  }

  createStudentCourse(feesTransactions:FeesTransactions){
    debugger;
    return this.http.post<FeesTransactions>(this.FeesTransactionUrl,feesTransactions,httpOptions)//.subscribe()
  }
}
