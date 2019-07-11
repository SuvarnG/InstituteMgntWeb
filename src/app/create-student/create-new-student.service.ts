import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Students,CreateStudent, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees,ThumbnailUrl } from '../Models/Students';
import { Utils } from '../Utils';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Authorization': `Bearer ${Utils.GetAccessToken()}`
})
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
  public thumbnailUrl:any='../../assets/images/MProfile.jpg';

  private Url = environment.APIBASEURL + 'Student/CreateStudent';
  private FeesUrl=environment.APIBASEURL+'Student/SaveOrUpdateFeesTransactionForStudent';
  private StudentLoginUrl=environment.APIBASEURL+'Login/CreateNewUser';
  private GetAllCourseTypeUrl=environment.APIBASEURL+'Course/GetAllCourseType';
  private uploadUrl=environment.APIBASEURL+'Upload/PostUserImage'

  constructor(private http: HttpClient) { }

  createNewStudent(students:CreateStudent){
    return this.http.post<CreateStudent>(this.Url,students,httpOptions) 
  }

  createStudentCourse(feesTransaction:FeesTransaction){
    return this.http.post<FeesTransaction>(this.FeesUrl,feesTransaction,httpOptions)
  }

  createStudentLogin(user:User){
    return this.http.post<User>(this.StudentLoginUrl,user,httpOptions)
  }

  getRecentlyCreatedStudent(){
    return this.http.get(environment.APIBASEURL+'Student/GetRecentlyCreatedStudent',httpOptions).pipe(map(data => data as RecentStudent[]))
  }


  getCourseNameFromCourseType(id){  
    return this.http.get(environment.APIBASEURL+'Student/GetCourseNameFromCourseType'+'/'+id,httpOptions).pipe(map(data => data as Courses[]))
  }

  getCourseFeesFromCourseName(id){
    return this.http.get(environment.APIBASEURL+'Student/GetCourseFeesFromCourseName'+'/'+id,httpOptions).pipe(map(data => data as CourseFees[]))
  }

  getUsersListForFeesTaken(){
    return this.http.get(environment.APIBASEURL+'Student/GetUsersListForFeesTaken',httpOptions).pipe(map(data => data as Users[]))
 
  }

  getRolesList(){
    this.http.get(environment.APIBASEURL+'Student/GetRolesList').toPromise().then(result=>this.listRoles=result as Roles[]) 
  }


postFile(formData)
  {
    debugger;
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  // postPhoto(formData)
  // {
  //   debugger;
  //   return this.http.post<any>(this.uploadUrl, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }

  // postPhoto(formData)
  // {
  //   debugger;
  //   return this.http.post<any>(this.uploadUrl, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   }).toPromise().then(result=>this.thumbnailUrl=result).catch();
  // }

  postPhoto(formData)
  {
    debugger;
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      res=>{
        debugger;
          
          if(res['type']==4){
           this.thumbnailUrl='Http://'+ res['body']['Message'];
           
          }
                        
      }
    )
  }
}