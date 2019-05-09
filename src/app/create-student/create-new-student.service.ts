import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Students,CreateStudent, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent } from '../Models/Students';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CreateNewStudentService {
  public listCourseType: CourseType[];
  public listCourses:Courses[];
  public listUsers:Users[];
  public listRoles:Roles[];
  public listRecentStudent: RecentStudent[]
  public NewStudId:unknown;

  private Url = environment.APIBASEURL + 'Student/CreateStudent';
  private FeesUrl=environment.APIBASEURL+'Student/SaveOrUpdateFeesTransactionForStudent';
  private StudentLoginUrl=environment.APIBASEURL+'Login/CreateNewUser';
  private GetAllCourseTypeUrl=environment.APIBASEURL+'Course/GetAllCourseType'

  constructor(private http: HttpClient) { }

  CreateNewStudent(students:CreateStudent){
    debugger;
    return this.http.post<CreateStudent>(this.Url,students,httpOptions).toPromise().then(result=>this.NewStudId = result as unknown);
    
  }

  CreateStudentCourse(feesTransaction:FeesTransaction){
    debugger;
    return this.http.post<FeesTransaction>(this.FeesUrl,feesTransaction,httpOptions)
  }

  CreateStudentLogin(user:User){
    debugger;
    return this.http.post<User>(this.StudentLoginUrl,user,httpOptions)
  }

  GetRecentlyCreatedStudent(){
    // return this.http.get<CourseType[]>(this.GetAllCourseTypeUrl,httpOptions)
    debugger;
    this.http.get(environment.APIBASEURL + 'student/GetRecentlyCreatedStudent').toPromise().then(result=>this.listRecentStudent = result as RecentStudent[]) 
  }

  GetAllCourseType(){
    // return this.http.get<CourseType[]>(this.GetAllCourseTypeUrl,httpOptions)

    this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result=>this.listCourseType = result as CourseType[]) 
  }

  GetCourseNameFromCourseType(id){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetCourseNameFromCourseType'+'/'+id).toPromise().then(result=>this.listCourses = result as Courses[])
  }

  GetUsersListForFeesTaken(){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetUsersListForFeesTaken').toPromise().then(result=>this.listUsers=result as Users[])
  }

  GetRolesListForDropDown(){
    debugger;
    this.http.get(environment.APIBASEURL+'Student/GetRolesListForDropDown').toPromise().then(result=>this.listRoles=result as Roles[])
  }
}
