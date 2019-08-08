import { Courses, CourseType, CourseFees } from '../shared/Model/Students';
import { CreateNewStudentService } from './../create-student/create-new-student.service';
import { CoursetypeService } from './../coursetype/coursetype.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherCoursesService } from './teacher-courses.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Roles } from '../shared/Model/Students';
import { Utils } from './../Utils';
import { InstituteAdminService } from '../institute-admin/institute-admin.service';


@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  shown: boolean = false;
  add: boolean = true;
  modalRef: BsModalRef;
  registerStaffForm: FormGroup;
  staffLoginForm: FormGroup;
  courseForm: FormGroup;
  submitted = false;
  errorMessage: string;
  public selectedCourseTypeValue: Number;
  public selectedCourseNameValue: string;
  disabled: boolean = true;
  newEmail: string;
  FName: string;
  LName: string;
  courseNameList: Courses[];
  CourseTypeList: CourseType[];
  roles: Roles[];
IsFixedPayment:boolean;
Salary:CourseFees[];
PreviousExperience:number=0;
public thumbnailUrl: any = '../../assets/images/MProfile.jpg';
chkEmailId:any;

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teacherCoursesService: TeacherCoursesService,
    public _DomSanitizationService: DomSanitizer,
    private coursetypeService: CoursetypeService,
    private createNewStudentService: CreateNewStudentService,
    private instituteAdminService:InstituteAdminService) { }

  ngOnInit() {
    this.registerStaffForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      Gender: ['', Validators.required],
      LastName: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      ContactNo: ['', Validators.required, Validators.pattern],
      Email: ['', Validators.required],
     // PreviousExperience: ['', Validators.required],
      DateOfLeaving: ['', Validators.required],
      DOB: ['', Validators.required],
      Photo: [''],
      Address1: ['', Validators.required],
      gridCheck1: [],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      P_Address1: ['', Validators.required],
      P_City: ['', Validators.required],
      P_State: ['', Validators.required],
      P_ZipCode: ['', Validators.required],
      EmergencyNo: ['', Validators.required, Validators.pattern],
      PreviousWorkName: ['', Validators.required],
      IsCv: [],
      IsFixedPayment: [],
      Document: [],
      BloodGroup: ['', Validators.required],
      // coursesArray: this.formBuilder.array([
      //   this.addNewRowForm()
      // ])
    });

    this.courseForm = this.formBuilder.group({
      CourseType: ['default', Validators.required],
      CourseName: ['', Validators.required],
      Salary:['', Validators.required]
    });
    this.staffLoginForm = this.formBuilder.group({
      //FirstName: ['', Validators.required],
     // LastName: ['', Validators.required],
      //Email: ['', Validators.required],
      //Role: ['', Validators.required],
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required]
    });
  }
  get f() { return this.registerStaffForm.controls; }
  get cf() { return this.courseForm.controls; }
  get login() { return this.staffLoginForm.controls; }

  onSubmit(template: TemplateRef<any>) {
    // stop here if form is invalid
    if (this.registerStaffForm.invalid == true || this.chkEmailId>0) {
      this.submitted = true;
      return;
    }
    else {     
         this.coursetypeService.courseTypeList().subscribe(res => {
           this.CourseTypeList = res
         });
        this.modalRef = this.modalService.show(template, {class: 'modal-xl'},);
      this.newEmail = this.registerStaffForm.controls.Email.value;
      this.FName = this.registerStaffForm.controls.FirstName.value;
      this.LName = this.registerStaffForm.controls.LastName.value;
      let body = {
        FirstName: this.registerStaffForm.controls.FirstName.value,
        MiddleName: this.registerStaffForm.controls.MiddleName.value,
        LastName: this.registerStaffForm.controls.LastName.value,
        Gender: this.registerStaffForm.controls.Gender.value,
        DateOfJoining: this.registerStaffForm.controls.DateOfJoining.value,
        BloodGroup: this.registerStaffForm.controls.BloodGroup.value,
        ContactNo: this.registerStaffForm.controls.ContactNo.value,
        Email: this.registerStaffForm.controls.Email.value,
        PreviousExperience: this.PreviousExperience,
        //PreviousExperience: this.registerStaffForm.controls.PreviousExperience.value,
        DateOfLeaving: this.registerStaffForm.controls.DateOfLeaving.value,
        DOB: this.registerStaffForm.controls.DOB.value,
        Photo: this.thumbnailUrl,
        Address1: this.registerStaffForm.controls.Address1.value,
        City: this.registerStaffForm.controls.City.value,
        State: this.registerStaffForm.controls.State.value,
        STDCode: this.registerStaffForm.controls.ZipCode.value,
        P_Address1: this.registerStaffForm.controls.P_Address1.value,
        P_City: this.registerStaffForm.controls.P_City.value,
        P_State: this.registerStaffForm.controls.P_State.value,
        P_STDCode: this.registerStaffForm.controls.P_ZipCode.value,
        EmergencyNo: this.registerStaffForm.controls.EmergencyNo.value,
        PreviousWorkName: this.registerStaffForm.controls.PreviousWorkName.value,
        IsCv: this.registerStaffForm.controls.IsCv.value,
        IsFixedPayment: this.registerStaffForm.controls.IsFixedPayment.value,
        BranchId: this.user.BranchId,
        InstituteId: this.user.InstituteId,
        CreatedBy:this.user.userId
      }
      this.teacherCoursesService.saveStaff(body)
        .subscribe((data) => {
        }, error => this.errorMessage = error)

    }

  }
  openModal(template: TemplateRef<any>) {
    if (this.registerStaffForm.controls.IsFixedPayment.value == true) {
      this.coursetypeService.courseTypeList();
      this.modalRef = this.modalService.show(template);
    }
  }

  Show() {
    if (this.shown == false) {
      this.shown = true;
    }
  }
  Hide() {
    if (this.shown == true) {
      this.shown = false;
    }
  }

  addNewRow(): void {
    this.disabled = !this.disabled;
    (<FormArray>this.registerStaffForm.get('coursesArray')).push(this.addNewRowForm());
  }

  removeCourse(courseGroupIndex: number): void {
    (<FormArray>this.registerStaffForm.get('coursesArray')).removeAt(courseGroupIndex);
  }

  addNewRowForm(): FormGroup {
    return this.formBuilder.group({
      CourseType: [],
      CourseName: [],
      Salary:[]
    });
  }
  selectCourseType(event) {
    this.selectedCourseTypeValue = event.target.value;
    this.createNewStudentService.getCourseNameFromCourseType(this.selectedCourseTypeValue).subscribe(res => {
      this.courseNameList = res
    });
  }
  selectCourseName(event) {
    this.selectedCourseNameValue = event.target.value;
  }

  checkAll(event: any) {
    if (event.currentTarget.checked == true) {
      this.registerStaffForm.controls.P_Address1.setValue(this.registerStaffForm.controls.Address1.value),
        this.registerStaffForm.controls.P_City.setValue(this.registerStaffForm.controls.City.value),
        this.registerStaffForm.controls.P_State.setValue(this.registerStaffForm.controls.State.value),
        this.registerStaffForm.controls.P_ZipCode.setValue(this.registerStaffForm.controls.ZipCode.value)

    }
    else {
      this.registerStaffForm.controls.P_Address1.reset(),
        this.registerStaffForm.controls.P_City.reset(),
        this.registerStaffForm.controls.P_State.reset(),
        this.registerStaffForm.controls.P_ZipCode.reset()
    }
  }

  getSalaryFromCourseName(event){
this.createNewStudentService.getCourseFeesFromCourseName(event.target.value).subscribe(res=>{
  this.Salary=res
})
  }
  onAddCourses(staffLoginTemplate: TemplateRef<any>) {
    this.submitted = true;
    if (this.courseForm.invalid == true) {
     // this.submitted = true;
      return;
    }
    else { 
      this.submitted = false;  
    this.IsFixedPayment= this.registerStaffForm.controls.IsFixedPayment.value;
    let body = {
      CourseTypeId: this.selectedCourseTypeValue,
      CourseId: this.selectedCourseNameValue,
      Salary:this.courseForm.controls.Salary.value
    }
    this.teacherCoursesService.addTeacherCourses(body)
      .subscribe((data) => {
        this.modalRef.hide();
        let body = {
          FirstName: this.FName,
          LastName: this.LName,
          Email: this.newEmail,
        }
        this.staffLoginForm.patchValue(body);
        this.teacherCoursesService.getRoleList().subscribe(res => {
          this.roles = res
        });
        this.modalRef = this.modalService.show(staffLoginTemplate);
      }, error => this.errorMessage = error)
  }
  }

  public user = Utils.GetCurrentUser();

  onStaffLogin() {
    if (this.staffLoginForm.invalid == true) {
      this.submitted = true;
      return;
    }
    else {    
    if (this.staffLoginForm.controls.Password.value != this.staffLoginForm.controls.VerifyPassword.value) {
      alert("Re-type Password");
    }
    else {
      let body = {
        FirstName: this.registerStaffForm.controls.FirstName.value,
        LastName: this.registerStaffForm.controls.LastName.value,
        Email: this.registerStaffForm.controls.Email.value,
        RoleId: 4,
        Password: this.staffLoginForm.controls.Password.value,
        Address: this.registerStaffForm.controls.Address1.value,
        CreatedBy: this.user.userId,
        Contact: this.registerStaffForm.controls.ContactNo.value,
        Gender: this.registerStaffForm.controls.Gender.value,
        LastLoginTime: this.user.lastLogin,
        IsActive: true,
        Photo: this.thumbnailUrl,
        BranchId: this.user.BranchId,
        InstituteId: this.user.InstituteId
      }
      this.teacherCoursesService.addStaffInUsers(body)
        .subscribe((data) => {
          this.modalRef.hide()
          this.router.navigate(['/StaffList']);
        }, error => this.errorMessage = error)
    }
  }
  }

  onImageSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerStaffForm.get('Photo').setValue(file);
    }
  }

  // onUploadPhoto()
  // {
  //   const formData = new FormData();
  //   formData.append('profile', this.registerStaffForm.get('Photo').value);
  //   this.teacherCoursesService.uploadPhoto(formData).subscribe(res=>{
  //         console.log(res);            
  //   });
  //   alert("Photo uploaded successfully");  
  // }


  onUploadPhoto() {
    const formData = new FormData();
    formData.append('profile', this.registerStaffForm.get('Photo').value);
    this.teacherCoursesService.postPhoto(formData).subscribe(
      res => {
        if (res['type'] == 4) {
          this.thumbnailUrl = 'Http://' + res['body']['Message'];
        }
      }
    );

  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      if(file.name.includes(".txt") || file.name.includes(".pdf"))
      {
        this.registerStaffForm.get('Document').setValue(file);
      }
      else{
            alert("Please select Proper file");
      }
      
    }
  }
  onUploadFile() {
    const formData = new FormData();
    formData.append('File', this.registerStaffForm.get('Document').value);
    this.teacherCoursesService.uploadFile(formData).subscribe(res => {
    });
  }

  calculateWorkExperience(DOJ:Date,DOL:Date){
    this.PreviousExperience=Number(new Date(DOL).getFullYear())  - Number(new Date(DOJ).getFullYear()) ;
  }

  validatingExistingUserEmail(EmailId:string){
    debugger;
    return this.instituteAdminService.validatingExistingUserEmail(EmailId).subscribe(data=>{
      this.chkEmailId=data;
    })
}


onCancel(){
  this.chkEmailId=0;
  this.submitted=false;
}

}
