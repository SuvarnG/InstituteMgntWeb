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
  private uploadUrl=environment.APIBASEURL+'Upload/PostUserImage'

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

//   postFile(formData){
//     debugger;
//     //const endpoint = this.uploadUrl     //'http://localhost:50076/api/Upload/PostUserImage'
//     //const formData = new FormData();
//     //formData.append('Files', fileToUpload.name);
//     return this.http.post<any>(this.uploadUrl, formData, httpOptions)
//       .pipe(map(() => { return true; }))
// }


postFile(formData)
  {
    debugger;
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  postPhoto(formData)
  {
    debugger;
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

// postFile(fileToUpload: File): Observable<boolean> {
//       debugger;
//       let formData: FormData = new FormData();
//       formData.append('file', fileToUpload);

//      this.http.put(this.uploadUrl , formData) .subscribe(data => {console.log(data);},
//     error => {
//         console.log(error);});
//   }


}
