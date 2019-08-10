import { Utils } from '../../Utils';
import { AuthService } from '../../../auth/services/auth.service';
import { CreateStaffService } from '../../../staff/services/create-staff.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentslistService } from '../../../student/services/students.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { StudentPendingFeesList } from 'shared/Model/Students';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from 'shared/Model/User';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})

export class TopNavComponent implements OnInit {

  constructor(private router: Router,
    private studentslistService: StudentslistService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private teacherCoursesService: CreateStaffService,
    private loginService: AuthService) { }

  _cookieService: any;
  modalRef: BsModalRef;
  updateProfileForm: FormGroup;
  StudentList: StudentPendingFeesList[];
  public thumbnailUrl: any;
  User: User;
  RoleId: number;
  submitted = false;
  currentRole: string;
  isLoggedIn$: Observable<boolean>;

  ngOnInit() {

    this.isLoggedIn$ = this.loginService.isLoggedIn;

    if (this.currentRole == 'Teacher' || this.currentRole == 'BranchManager') {
      this.getAllStudentsPendingFeesDetails();
    }

    this.updateProfileForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Photo: [],
      UpdatePassword: [],
      Password: [],
      Contact: ['', Validators.required],
      Address: ['', Validators.required]
    })

  }

  get f() { return this.updateProfileForm.controls; }

  public user = Utils.GetCurrentUser();

  Logout() {
    localStorage.removeItem('CurrentUser');
    this.loginService.logout();
  }

  getAllStudentsPendingFeesDetails() {
    this.studentslistService.getAllStudentsPendingFeesDetails(this.user.BranchId).subscribe(res => {
      this.StudentList = res;
    })
  }

  getUserRole() {
    this.currentRole = Utils.GetUserRole();
  }

  openUpdateProfileTemplate(template: TemplateRef<any>, user) {
    this.getUserDetails(Number(this.user.userId));
    this.RoleId = user.RoleId;
    this.thumbnailUrl = user.Photo;
    this.updateProfileForm.patchValue({
      FirstName: this.User.FirstName,
      LastName: this.User.LastName,
      Contact: this.User.Contact,
      Address: this.User.Address,
      Email: this.User.Email
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
    this.submitted = true;
    if (this.updateProfileForm.invalid) {
      return;
    }
    if (this.updateProfileForm.controls.Password.value) {
      let body = {
        FirstName: this.updateProfileForm.controls.FirstName.value,
        LastName: this.updateProfileForm.controls.LastName.value,
        Contact: this.updateProfileForm.controls.Contact.value,
        Address: this.updateProfileForm.controls.Address.value,
        Photo: this.thumbnailUrl,
        Email: this.updateProfileForm.controls.Email.value,
        Password: this.updateProfileForm.controls.Password.value,
        Id: this.User.Id
      }
      this.loginService.updateUser(body).subscribe(data => {
        this.modalRef.hide();
      });
    }
    else {
      let body = {
        FirstName: this.updateProfileForm.controls.FirstName.value,
        LastName: this.updateProfileForm.controls.LastName.value,
        Contact: this.updateProfileForm.controls.Contact.value,
        Address: this.updateProfileForm.controls.Address.value,
        Photo: this.thumbnailUrl,
        Email: this.updateProfileForm.controls.Email.value,
        Password: this.User.Password,
        Id: this.User.Id
      }
      this.loginService.updateUser(body).subscribe(data => {
        this.modalRef.hide();
      });
    }
  }
}
