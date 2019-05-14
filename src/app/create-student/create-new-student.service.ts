import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Students,CreateStudent, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from '../Models/Students';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CreateNewStudentService {
  public listCourseType: CourseType[];
  public listCourses:Courses[];
  public listCourseFees:CourseFees[];
  public listUsers:Users[];
  public listRoles:Roles[];
  public listRecentStudent: RecentStudent[]
  public NewStudId:unknown;
  public StudentId:number;
  private Url = environment.APIBASEURL + 'Student/CreateStudent';
  private FeesUrl=environment.APIBASEURL+'Student/SaveOrUpdateFeesTransactionForStudent';
  private StudentLoginUrl=environment.APIBASEURL+'Login/CreateNewUser';
  private GetAllCourseTypeUrl=environment.APIBASEURL+'Course/GetAllCourseType';

  constructor(private http: HttpClient) { }

  createNewStudent(students:CreateStudent){
    return this.http.post<CreateStudent>(this.Url,students,httpOptions) //.toPromise().then(result=>this.NewStudId = result as unknown);    
  }

  createStudentCourse(feesTransaction:FeesTransaction){
    return this.http.post<FeesTransaction>(this.FeesUrl,feesTransaction,httpOptions)
  }

  createStudentLogin(user:User){
    return this.http.post<User>(this.StudentLoginUrl,user,httpOptions)
  }

  getRecentlyCreatedStudent(){
    this.http.get(environment.APIBASEURL + 'student/GetRecentlyCreatedStudent').toPromise().then(result=>this.listRecentStudent = result as RecentStudent[]
    ) 
  }

  getAllCourseType(){
    this.http.get(environment.APIBASEURL + 'Course/GetAllCourseType').toPromise().then(result=>this.listCourseType = result as CourseType[]) 
  }

  getCourseNameFromCourseType(id){
    this.http.get(environment.APIBASEURL+'Student/GetCourseNameFromCourseType'+'/'+id).toPromise().then(result=>this.listCourses = result as Courses[])
  }

  getCourseFeesFromCourseName(id){
    this.http.get(environment.APIBASEURL+'Student/GetCourseFeesFromCourseName'+'/'+id).toPromise().then(result=>this.listCourseFees = result as CourseFees[])
  }

  getUsersListForFeesTaken(){
    this.http.get(environment.APIBASEURL+'Student/GetUsersListForFeesTaken').toPromise().then(result=>this.listUsers=result as Users[])
  }

  getRolesList(){
    this.http.get(environment.APIBASEURL+'Student/GetRolesList').toPromise().then(result=>this.listRoles=result as Roles[])
  }

  postFile(fileToUpload: File): Observable<boolean> {
    debugger;
    const endpoint = 'http://localhost:50076/api/Student/UploadFile'
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, httpOptions)
      .pipe(map(() => { return true; }))
}


}
