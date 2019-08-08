import { CourseFees, Users } from '../shared/Model/Students';
import { CoursetypeService } from './../coursetype/coursetype.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms'
import { CreateNewStudentService } from './create-new-student.service';
import { Students, CreateStudent, FeesTransaction, User, CourseType, Courses, RecentStudent } from '../shared/Model/Students';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { template } from '@angular/core/src/render3';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from '../Utils';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  submitted = false;
  submitStudentFees = false;
  submitStudentLogin = false;
  showSelected: Boolean = false;
  registerStudentCourse: FormGroup;
  registerStudentLogin: FormGroup;
  selectedUserValue: number;
  selectedFeesValue: number;
  selectedRoleValue: number;
  selectedStudentIdValue: number;
  selectedCourseFeesValue: number;
  selectedStudentFirstName: string;
  selectedStudentLastName: string;
  selectedStudentEmail: string;
  CalculatedDiscountedAmount: number;
  selectedPayingFeesNow: boolean;
  NewStudentid: number;
  newRecentStudent: RecentStudent[];
  fileToUpload: File = null;
  courseFees: CourseFees[];
  getRecentStudent: RecentStudent[];
  users: Users[];
  courses:Courses[];
  courseTypeList:CourseType[];
  thumbnailDocUrl:any;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,
    public CreateNewStudentService: CreateNewStudentService,
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private coursetypeService: CoursetypeService) { }


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
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
      //payingFeesNow: [],
      Document: [],
      Photo: ['../../assets/images/MProfile.jpg'],
      NewImage: ['']
    });




    this.registerStudentCourse = this.formBuilder.group({
      //StudentID: ['', Validators.required],
      CourseType: ['', Validators.required],
      CourseName: ['', Validators.required],
      CourseFees: ['', Validators.required],
      FeesAmount: ['', Validators.required],
      AnyDiscount: ['', Validators.required],
      NewDiscountedAmount: ['', Validators.required],
      //DateofPayment: ['', Validators.required],
      //FeesTakenBy: ['', Validators.required],
      Remark: ['', Validators.required]
    },
    );


    this.registerStudentLogin = this.formBuilder.group({
      FirstName: ['', Validators.required],
      Lastname: ['', Validators.required],
      EMailId: ['', Validators.required],
      Role: ['', Validators.required],
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required],
      CreatedBy: ['', Validators.required]
    });

  }

  selectAddress(event: any) {
    if (event.currentTarget.checked == true) {
      this.registerForm.controls.Address1.setValue(this.registerForm.controls.PAddress1.value)
      this.registerForm.controls.city.setValue(this.registerForm.controls.Pcity.value)
      this.registerForm.controls.state.setValue(this.registerForm.controls.Pstate.value)
      this.registerForm.controls.zipCode.setValue(this.registerForm.controls.PzipCode.value)

    }
    else {
      this.registerForm.controls.Address1.reset();
      this.registerForm.controls.city.reset();
      this.registerForm.controls.state.reset();
      this.registerForm.controls.zipCode.reset();
    }
  }


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


  openModal(template: TemplateRef<any>) {
    
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    }

    //Create Student Function
    let body: CreateStudent = {
      Gender: this.registerForm.controls.gender.value,
      FirstName: this.registerForm.controls.firstName.value,
      MiddleName: this.registerForm.controls.middleName.value,
      LastName: this.registerForm.controls.lastName.value,
      Address1: this.registerForm.controls.Address1.value,
      City: this.registerForm.controls.city.value,
      State: this.registerForm.controls.state.value,
      STDCode: this.registerForm.controls.zipCode.value,
      DOB: this.registerForm.controls.dateOfBirth.value,
      BloodGroup: this.registerForm.controls.bloodgroup.value,
      ContactNo: this.registerForm.controls.ContactNo.value,
      EmergencyNo: this.registerForm.controls.EmergencyContactNo.value,
      EmailId: this.registerForm.controls.Email.value,
      PAddress1: this.registerForm.controls.PAddress1.value,
      PCity: this.registerForm.controls.Pcity.value,
      PState: this.registerForm.controls.Pstate.value,
      PSTDCode: this.registerForm.controls.PzipCode.value,
      Photo: this.CreateNewStudentService.thumbnailUrl,
      IsDocumentSubmitted: this.registerForm.controls.IsDocumentSubmitted.value,
      Document:this.thumbnailDocUrl,
      //PayingFees: this.registerForm.controls.payingFeesNow.value
    };


    this.CreateNewStudentService.createNewStudent(body).subscribe(data =>
      // do something, if upload success
      this.CreateNewStudentService.getRecentlyCreatedStudent().subscribe(res => {
        this.getRecentStudent = res
      })
    );

    //Open Popup function
      this.modalRef = this.modalService.show(template, {
        animated: true,
        backdrop: 'static',
        class:'modal-xl'
      });
      this.coursetypeService.courseTypeList().subscribe(res=>{
        this.courseTypeList=res
      });
      // this.CreateNewStudentService.GetCourseNameFromCourseType(this.selectedUserValue);
      this.CreateNewStudentService.getUsersListForFeesTaken().subscribe(res => {
        this.users = res
      });
    
  }

  onImageSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerForm.get('Photo').setValue(file);
    }
  }

  openModal2(template: TemplateRef<any>) {
    this.submitStudentFees = true;
    if (this.registerStudentCourse.invalid) {
      return
    }

    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
    this.CreateNewStudentService.getRolesList();
  }


  get f() { return this.registerForm.controls; }

  get g() { return this.registerStudentCourse.controls; }

  get e() { return this.registerStudentLogin.controls }


  onSubmitStudentLogin() {
    this.submitStudentLogin = true;

    //stop here if form is invalid
    if (this.registerStudentLogin.invalid) {
      return;
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

  showUpload() {
    if(this.registerForm.controls.IsDocumentSubmitted.value==true)
    this.showSelected = true;
    else
    this.showSelected = false;
  }

  // hideUpload() {
  //   if(this.showSelected==true){
  //     this.showSelected = false;
  //   }
    
  // }

  public user=Utils.GetCurrentUser();


  createStudentCourse(feesTransaction: FeesTransaction) {
    this.submitStudentFees = true;
    if (this.registerStudentCourse.invalid) {
      return
    }

    let body = {
      Id: 0,
      CourseId: this.registerStudentCourse.controls.CourseName.value,
      //StudentId: this.selectedStudentIdValue,
      CourseFees: this.registerStudentCourse.controls.CourseFees.value,
      NewDiscountedAmount: this.registerStudentCourse.controls.NewDiscountedAmount.value,
      DateOfPayment: new Date(),
      FeesPaid: this.registerStudentCourse.controls.FeesAmount.value,
      FeesTakenBy: this.user.userId.toString(),
      PendingFees:(Number(this.registerStudentCourse.controls.NewDiscountedAmount.value)-Number(this.registerStudentCourse.controls.FeesAmount.value)),
      BranchId:this.user.BranchId,
      InstituteId:this.user.InstituteId,
      CourseCompleted: false,
      Discount: this.registerStudentCourse.controls.AnyDiscount.value,
      TotalFees: this.registerStudentCourse.controls.NewDiscountedAmount.value,
      Remark: this.registerStudentCourse.controls.Remark.value,
      IsActive: true

    };

      this.modalRef.hide();
      this.CreateNewStudentService.createStudentCourse(body).subscribe(data => { this.router.navigateByUrl('/StudentList') });
   
  }



  //   createStudentLogin(user: User) {

  //     this.submitStudentLogin = true;
  //     if (this.registerStudentLogin.invalid) {
  //       return
  //     }

  //     let body: User = {
  //       Id: 0,
  //       //StudentId:this.registerStudentLogin.controls.StudentID.value,
  //       FirstName: this.selectedStudentFirstName,
  //       LastName: this.selectedStudentLastName,
  //       Email: this.selectedStudentEmail,
  //       Password: this.registerStudentLogin.controls.VerifyPassword.value,
  //       RoleId: this.selectedRoleValue,
  //       CreatedBy: this.registerStudentLogin.controls.CreatedBy.value

  //     };

  //     if(this.registerStudentLogin.controls.Password.value!=this.registerStudentLogin.controls.VerifyPassword.value)
  //     {
  //       alert("Password did not matched..Please verify password")
  //     }
  //     else
  //     {
  //     if (confirm("Are you sure to create a login?")) {
  //       this.CreateNewStudentService.createStudentLogin(body).subscribe((data) => 
  //         {this.modalRef.hide(),
  //         this.router.navigateByUrl('/StudentList') });

  //     }
  //   }
  // }



  // handleFileInput(event: any) {
  //   if (event.target.files.length) {
  //     const file = event.target.files[0];
  //     this.registerForm.get('Document').setValue(file);
  //   }
  // }


  handleFileInput(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      if(file.name.includes(".txt") || file.name.includes(".pdf"))
      {
        this.registerForm.get('Document').setValue(file);
      }
      else{
            alert("Please select Proper file");
      }
      
    }
  }

  handlePhotoInput(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerForm.get('Photo').setValue(file);
    }
  }

  // onUploadFile() {
  //   const formData = new FormData();
  //   formData.append('profile', this.registerForm.get('Document').value)//this.registerForm.get('Documents').value);
  //   this.CreateNewStudentService.postFile(formData).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  onUploadFile() {
    const formData = new FormData();
    formData.append('File', this.registerForm.get('Document').value);
    this.CreateNewStudentService.postFile(formData).subscribe(
      res=>{ 
             
          if(res['type']==4){ 
           this.thumbnailDocUrl='Http://'+ res['body']['Message'];
           
          }
                        
      }
    );
  }

  // onUploadPhoto()
  // {
  //   const formData = new FormData();
  //   formData.append('profile',this.registerForm.get('Photo').value)//this.registerForm.get('Documents').value);
  //   this.CreateNewStudentService.postPhoto(formData).subscribe(res=>{
  //         console.log(res);        
  //   });
  // }


  onUploadPhoto() {
    const formData = new FormData();
    formData.append('profile', this.registerForm.get('Photo').value)//this.registerForm.get('Documents').value);
    this.CreateNewStudentService.postPhoto(formData)
  }

  selectStudentId(event) {
    this.selectedStudentIdValue = event.target.value;
  }

  selectStudentFirstName(event) {
    this.selectedStudentFirstName = event.target.value;
  }

  selectStudentLastName(event) {
    this.selectedStudentLastName = event.target.value;
  }

  selectStudentEmail(event) {
    this.selectedStudentEmail = event.target.value;
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

  selectRole(event) {
    this.selectedRoleValue = event.target.value;
  }


  selectPayingFeesNow(event) {
    this.selectedPayingFeesNow = event.target.value;
  }

  getCourseNameFromCourseType(courses: Courses) {
    this.CreateNewStudentService.getCourseNameFromCourseType(this.selectedUserValue).subscribe(res=>{
      this.courses=res
    })

  }

  getCourseFeesFromCourseName(courses: Courses) {
    this.CreateNewStudentService.getCourseFeesFromCourseName(this.selectedFeesValue).subscribe(res => {
      this.courseFees = res
    })

  }

  calculateDiscountedAmount() {
    
    this.CalculatedDiscountedAmount = ((this.registerStudentCourse.controls.CourseFees.value) - ((this.registerStudentCourse.controls.AnyDiscount.value / 100) * this.registerStudentCourse.controls.CourseFees.value))
    this.registerStudentCourse.controls.NewDiscountedAmount.setValue(this.CalculatedDiscountedAmount)

  }

}