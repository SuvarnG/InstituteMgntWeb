import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Students,CreateStudent, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees,ThumbnailUrl } from '../shared/Model/Students';
import { Utils } from '../Utils';



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

  getAuthHeader(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Utils.GetAccessToken()}`
      })      
    };
    return httpOptions
  }

  createNewStudent(students:CreateStudent){
    return this.http.post<CreateStudent>(this.Url,students,this.getAuthHeader()) 
  }

  createStudentCourse(feesTransaction){
    return this.http.post<FeesTransaction>(this.FeesUrl,feesTransaction,this.getAuthHeader())
  }

  createStudentLogin(user:User){
    return this.http.post<User>(this.StudentLoginUrl,user,this.getAuthHeader())
  }

  getRecentlyCreatedStudent(){
    return this.http.get(environment.APIBASEURL+'Student/GetRecentlyCreatedStudent',this.getAuthHeader()).pipe(map(data => data as RecentStudent[]))
  }


  getCourseNameFromCourseType(id){  
    return this.http.get(environment.APIBASEURL+'Student/GetCourseNameFromCourseType'+'/'+id,this.getAuthHeader()).pipe(map(data => data as Courses[]))
  }

  getCourseFeesFromCourseName(id){
    return this.http.get(environment.APIBASEURL+'Student/GetCourseFeesFromCourseName'+'/'+id,this.getAuthHeader()).pipe(map(data => data as CourseFees[]))
  }

  getUsersListForFeesTaken(){
    return this.http.get(environment.APIBASEURL+'Student/GetUsersListForFeesTaken',this.getAuthHeader()).pipe(map(data => data as Users[]))
 
  }

  getRolesList(){
    this.http.get(environment.APIBASEURL+'Student/GetRolesList').toPromise().then(result=>this.listRoles=result as Roles[]) 
  }


// postFile(formData)
//   {
//     return this.http.post<any>(environment.APIBASEURL+'Upload/PostFile', formData, {
//       reportProgress: true,
//       observe: 'events'
//     });
//   }

  postFile(formData) {
    return this.http.post<any>(environment.APIBASEURL + 'Upload/PostFile', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  // postPhoto(formData)
  // {
  //   return this.http.post<any>(this.uploadUrl, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }

  // postPhoto(formData)
  // {
  //   return this.http.post<any>(this.uploadUrl, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   }).toPromise().then(result=>this.thumbnailUrl=result).catch();
  // }

  postPhoto(formData)
  {
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      res=>{      
          if(res['type']==4){
           this.thumbnailUrl='Http://'+ res['body']['Message'];
           
          }
                        
      }
    )
  }
}