import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { CreateStudent, FeesTransaction, CourseType, Courses, RecentStudent, CourseFees } from 'shared/Model/Students';
import { Utils } from '../../Core/Utils';

@Injectable({
  providedIn: 'root'
})
export class CreateNewStudentService {
  public listCourseType: CourseType[];
  public listCourses: Courses[];
  public listCourseFees: CourseFees[];
  public listRecentStudent: RecentStudent[]
  public NewStudId: unknown;
  public StudentId: number;
  public thumbnailUrl: any = '../../assets/images/MProfile.jpg';

  private Url = environment.APIBASEURL + 'Student/CreateStudent';
  private FeesUrl = environment.APIBASEURL + 'Student/SaveOrUpdateFeesTransactionForStudent';
  private uploadUrl = environment.APIBASEURL + 'Upload/PostUserImage'

  constructor(private http: HttpClient) { }

  createNewStudent(students: CreateStudent) {
    return this.http.post<CreateStudent>(this.Url, students, Utils.getAuthHeader())
  }

  createStudentCourse(feesTransaction) {
    return this.http.post<FeesTransaction>(this.FeesUrl, feesTransaction, Utils.getAuthHeader())
  }

  getCourseNameFromCourseType(id) {
    return this.http.get(environment.APIBASEURL + 'Student/GetCourseNameFromCourseType' + '/' + id, Utils.getAuthHeader()).pipe(map(data => data as Courses[]))
  }

  getCourseFeesFromCourseName(id) {
    return this.http.get(environment.APIBASEURL + 'Student/GetCourseFeesFromCourseName' + '/' + id, Utils.getAuthHeader()).pipe(map(data => data as CourseFees[]))
  }

  postFile(formData) {
    return this.http.post<any>(environment.APIBASEURL + 'Upload/PostFile', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  postPhoto(formData) {
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      res => {
        if (res['type'] == 4) {
          this.thumbnailUrl = 'Http://' + res['body']['Message'];
        }
      }
    )
  }
}