import { LoginService } from './../../../login/login.service';
import { TeacherCoursesService } from './../../../teacher-courses/teacher-courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentslistService } from './../../../student-list/studentslist.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/Utils';
import { StudentPendingFeesList } from 'src/app/Model/Students';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from 'src/app/Model/User';



@Component({
  selector: 'app-authorised-top-nav',
  templateUrl: './authorised-top-nav.component.html',
  styleUrls: ['./authorised-top-nav.component.css']
})
export class AuthorisedTopNavComponent implements OnInit {
  _cookieService: any;
  modalRef: BsModalRef;
  updateProfileForm: FormGroup;
  StudentList: StudentPendingFeesList[];
  public thumbnailUrl: any;
  User: User;
  RoleId: number;
  constructor(private router: Router,
    private studentslistService: StudentslistService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private teacherCoursesService: TeacherCoursesService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getAllStudentsPendingFeesDetails();

    this.updateProfileForm = this.formBuilder.group({
      FirstName: [],
      LastName: [],
      Email: [],
      Photo: [],
      UpdatePassword: [],
      Password: [],
      Contact: [],
      Address: [],
      Role: [],
    })
    this.getUserDetails(Number(this.user.userId));
  }
  get f() { return this.updateProfileForm.controls; }
  Logout() {
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['/Login']);
  }
  getAllStudentsPendingFeesDetails() {
    this.studentslistService.getAllStudentsPendingFeesDetails(this.user.BranchId).subscribe(res => {
      this.StudentList = res;
    })
  }
  public user = Utils.GetCurrentUser();

  openUpdateProfileTemplate(template: TemplateRef<any>, user) {
    this.RoleId = user.RoleId;
    this.thumbnailUrl = user.Photo;
    this.updateProfileForm.patchValue({
      FirstName: this.User.FirstName,
      LastName: this.User.LastName,
      Contact: this.User.Contact,
      Address: this.User.Address,
      Role: user.roles,
      Email: this.User.Email,
    })
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }
  onImageSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.updateProfileForm.get('Photo').setValue(file);
    }
  }
  onUploadPhoto() {
    const formData = new FormData();
    formData.append('profile', this.updateProfileForm.get('Photo').value);
    this.teacherCoursesService.postPhoto(formData).subscribe(
      res => {
        if (res['type'] == 4) {
          this.thumbnailUrl = 'Http://' + res['body']['Message'];
        }
      }
    );

  }

  getUserDetails(id: number) {
    this.loginService.getUserDetails(id).subscribe(res => {
      this.User = res;
    })
  }

  onSubmitUpdateProfile() {
    let body = {
      FirstName: this.updateProfileForm.controls.FirstName.value,
      LastName: this.updateProfileForm.controls.LastName.value,
      Contact: this.updateProfileForm.controls.Contact.value,
      Address: this.updateProfileForm.controls.Address.value,
      Photo: this.thumbnailUrl,
      Email: this.updateProfileForm.controls.Email.value,
      Password: this.updateProfileForm.controls.Password.value,
      RoleId: this.User.RoleId,
      Id: this.User.Id
    }
    this.loginService.updateUser(body).subscribe(data => {
      this.modalRef.hide();
    });
  }
}
