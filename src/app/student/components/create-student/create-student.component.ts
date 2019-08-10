import { StudentslistService } from '../../services/students.service';
import { CourseFees, Users } from 'shared/Model/Students';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms'
import { CreateStudent, FeesTransaction, CourseType, Courses, RecentStudent } from 'shared/Model/Students';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from '../../../Core/Utils';
import { CoursesService } from 'src/app/Courses/Services/courses.service';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private modalService: BsModalService, 
    private formBuilder: FormBuilder,
    private studentsListService:StudentslistService,
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private coursesService: CoursesService) { }


  modalRef: BsModalRef;
  createNewStudentForm: FormGroup;
  submitted = false;
  submitStudentFees = false;
  submitStudentLogin = false;
  showSelected: Boolean = false;
  registerStudentCourse: FormGroup;
  registerStudentLogin: FormGroup;
  selectedUserValue: number;
  selectedFeesValue: number;
  selectedCourseFeesValue: number;
  CalculatedDiscountedAmount: number;
  NewStudentid: number;
  newRecentStudent: RecentStudent[];
  fileToUpload: File = null;
  courseFees: CourseFees[];
  getRecentStudent: RecentStudent[];
  users: Users[];
  courses: Courses[];
  courseTypeList: CourseType[];
  thumbnailDocUrl: any;
  public thumbnailUrl: any = '../../assets/images/MProfile.jpg';


  ngOnInit() {

    this.createNewStudentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      Address1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      PAddress1: ['', Validators.required],
      Pcity: ['', Validators.required],
      Pstate: ['', Validators.required],
      PzipCode: ['', Validators.required],
      IsDocumentSubmitted: [],
      dateOfBirth: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      ContactNo: ['', [Validators.required, this.phoneNumberValidator]],
      EmergencyContactNo: ['', [Validators.required, this.phoneNumberValidator]],
      Email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      Document: [],
      Photo: ['../../assets/images/MProfile.jpg'],
      NewImage: ['']
    });

    this.registerStudentCourse = this.formBuilder.group({
      CourseType: ['', Validators.required],
      CourseName: ['', Validators.required],
      CourseFees: ['', Validators.required],
      FeesAmount: ['', Validators.required],
      AnyDiscount: ['', Validators.required],
      NewDiscountedAmount: ['', Validators.required],
      Remark: ['', Validators.required]
    },
    );

  }

  selectAddress(event: any) {
    if (event.currentTarget.checked == true) {
      this.createNewStudentForm.controls.Address1.setValue(this.createNewStudentForm.controls.PAddress1.value)
      this.createNewStudentForm.controls.city.setValue(this.createNewStudentForm.controls.Pcity.value)
      this.createNewStudentForm.controls.state.setValue(this.createNewStudentForm.controls.Pstate.value)
      this.createNewStudentForm.controls.zipCode.setValue(this.createNewStudentForm.controls.PzipCode.value)
    }
    else {
      this.createNewStudentForm.controls.Address1.reset();
      this.createNewStudentForm.controls.city.reset();
      this.createNewStudentForm.controls.state.reset();
      this.createNewStudentForm.controls.zipCode.reset();
    }
  }

  public user = Utils.GetCurrentUser();

  get f() { return this.createNewStudentForm.controls; }

  get g() { return this.registerStudentCourse.controls; }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  matchValidator(group: FormGroup) {
    let password = this.registerStudentLogin.controls.Password.value;
    let verifyPassword = this.registerStudentLogin.controls.VerifyPassword.value;

    if (password == verifyPassword) {
      return null;
    }
    return {
      mismatch: true
    }
  }


  createNewStudent(template: TemplateRef<any>) {
    this.submitted = true;
    if (this.createNewStudentForm.invalid) {
      return
    }
    //Create Student Function
    let body: CreateStudent = {
      Gender: this.createNewStudentForm.controls.gender.value,
      FirstName: this.createNewStudentForm.controls.firstName.value,
      MiddleName: this.createNewStudentForm.controls.middleName.value,
      LastName: this.createNewStudentForm.controls.lastName.value,
      Address1: this.createNewStudentForm.controls.Address1.value,
      City: this.createNewStudentForm.controls.city.value,
      State: this.createNewStudentForm.controls.state.value,
      STDCode: this.createNewStudentForm.controls.zipCode.value,
      DOB: this.createNewStudentForm.controls.dateOfBirth.value,
      BloodGroup: this.createNewStudentForm.controls.bloodgroup.value,
      ContactNo: this.createNewStudentForm.controls.ContactNo.value,
      EmergencyNo: this.createNewStudentForm.controls.EmergencyContactNo.value,
      EmailId: this.createNewStudentForm.controls.Email.value,
      PAddress1: this.createNewStudentForm.controls.PAddress1.value,
      PCity: this.createNewStudentForm.controls.Pcity.value,
      PState: this.createNewStudentForm.controls.Pstate.value,
      PSTDCode: this.createNewStudentForm.controls.PzipCode.value,
      Photo: this.thumbnailUrl,
      IsDocumentSubmitted: this.createNewStudentForm.controls.IsDocumentSubmitted.value,
      Document: this.thumbnailDocUrl,
    };
    this.studentsListService.createNewStudent(body).subscribe(data =>{}
    );

    //Open Popup function
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static',
      class: 'modal-xl'
    });
    this.coursesService.courseTypeList().subscribe(res => {
      this.courseTypeList = res
    });

  }

  onImageSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.createNewStudentForm.get('Photo').setValue(file);
    }
  }

  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(control.value)
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
  }

  createStudentCourse(feesTransaction: FeesTransaction) {
    this.submitStudentFees = true;
    if (this.registerStudentCourse.invalid) {
      return
    }
    let body = {
      Id: 0,
      CourseId: this.registerStudentCourse.controls.CourseName.value,
      CourseFees: this.registerStudentCourse.controls.CourseFees.value,
      NewDiscountedAmount: this.registerStudentCourse.controls.NewDiscountedAmount.value,
      DateOfPayment: new Date(),
      FeesPaid: this.registerStudentCourse.controls.FeesAmount.value,
      FeesTakenBy: this.user.userId.toString(),
      PendingFees: (Number(this.registerStudentCourse.controls.NewDiscountedAmount.value) - Number(this.registerStudentCourse.controls.FeesAmount.value)),
      BranchId: this.user.BranchId,
      InstituteId: this.user.InstituteId,
      CourseCompleted: false,
      Discount: this.registerStudentCourse.controls.AnyDiscount.value,
      TotalFees: this.registerStudentCourse.controls.NewDiscountedAmount.value,
      Remark: this.registerStudentCourse.controls.Remark.value,
      IsActive: true
    };
    this.modalRef.hide();
    this.studentsListService.createStudentCourse(body).subscribe(data => { this.router.navigateByUrl('/studentlist') });
  }

  handleFileInput(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      if (file.name.includes(".txt") || file.name.includes(".pdf")) {
        this.createNewStudentForm.get('Document').setValue(file);
      }
      else {
        alert("Please select Proper file");
      }
    }
  }

  handlePhotoInput(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.createNewStudentForm.get('Photo').setValue(file);
    }
  }

  onUploadFile() {
    const formData = new FormData();
    formData.append('File', this.createNewStudentForm.get('Document').value);
    this.studentsListService.postFile(formData).subscribe(
      res => {
        if (res['type'] == 4) {
          this.thumbnailDocUrl = 'Http://' + res['body']['Message'];
        }
      }
    );
  }

  onUploadPhoto() {
    const formData = new FormData();
    formData.append('profile', this.createNewStudentForm.get('Photo').value)
    this.studentsListService.postPhoto(formData).subscribe(
      res => {
        if (res['type'] == 4) {
          this.thumbnailUrl = 'Http://' + res['body']['Message'];
        }
      }
    );
  }

  selectCourseFees(event) {
    this.selectedCourseFeesValue = event.target.value;
  }

  selectUser(event) {
    this.selectedUserValue = event.target.value;
  }

  selectFees(event) {
    this.selectedFeesValue = event.target.value;
  }

  getCourseNameFromCourseType(courses: Courses) {
    this.studentsListService.getCourseNameFromCourseType(this.selectedUserValue).subscribe(res => {
      this.courses = res
    })
  }

  getCourseFeesFromCourseName(courses: Courses) {
    this.studentsListService.getCourseFeesFromCourseName(this.selectedFeesValue).subscribe(res => {
      this.courseFees = res
    })
  }

  calculateDiscountedAmount() {
    this.CalculatedDiscountedAmount = ((this.registerStudentCourse.controls.CourseFees.value) - ((this.registerStudentCourse.controls.AnyDiscount.value / 100) * this.registerStudentCourse.controls.CourseFees.value))
    this.registerStudentCourse.controls.NewDiscountedAmount.setValue(this.CalculatedDiscountedAmount)
  }

}