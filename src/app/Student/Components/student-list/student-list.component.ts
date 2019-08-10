import { StudentslistService } from '../../services/students.service';
import { CourseType, Courses, FeesTransactions } from 'shared/Model/Students';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Students } from 'shared/Model/Students'
import { Utils } from '../../../Core/Utils';
import { CoursesService } from 'src/app/Courses/Services/courses.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private modalService: BsModalService,
    private router: Router,
    private StudentslistService: StudentslistService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private studentsListService: StudentslistService,
    private coursesService: CoursesService) { }

  public thumbnailUrl: any = '../../assets/images/MProfile.jpg';
  modalRef: BsModalRef
  payStudent: Students;
  feesTransaction: FeesTransactions[];
  [x: string]: any;
  returnUrl: string;
  studentID: number;
  submitted: boolean;
  registerUpdateStudent: FormGroup;
  StudentFeesForm: FormGroup;
  ModalOptions: ModalOptions;
  showSelected: boolean;
  students: Students[];
  CourseTypeList: CourseType[];
  courseNameList: Courses[];
  urlDocument: any;
  studentDetails: Students;
  getPendingFees: number;

  ngOnInit() {
    this.returnUrl = '/create-student';

    this.getAllStudents(this.user.InstituteId, this.user.BranchId);

    this.StudentFeesForm = this.formBuilder.group({
      FeesAmount: ['', Validators.required],
    })

    this.registerUpdateStudent = this.formBuilder.group({
      Gender: ['', Validators.required],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      LastName: ['', Validators.required],
      DOB: ['', Validators.required],
      BloodGroup: ['', Validators.required],
      ContactNo: ['', Validators.required],
      EmergencyNo: ['', Validators.required],
      Address1: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      PAddress1: ['', Validators.required],
      CourseType: ['', Validators.required],
      Course: ['', Validators.required],
      PCity: ['', Validators.required],
      PState: ['', Validators.required],
      PSTDCode: ['', Validators.required],
      Email: ['', Validators.required],
      ZipCode: ['', Validators.required],
      IsDocumentSubmitted: [],
      Photo: [],
      //Document:[]
    })

  }

  public user = Utils.GetCurrentUser();

  get f() { return this.registerUpdateStudent.controls };
  get fc() { return this.StudentFeesForm.controls };

  getAllStudents(InstituteId: number, BranchId: number) {
    InstituteId: this.user.InstituteId;
    BranchId: this.user.BranchId;
    this.StudentslistService.getAllStudents(InstituteId, BranchId).subscribe(res => {
      this.students = res
    });
  }

  deleteStudent(id: number) {
    if (confirm("Are you sure to delete this student? ")) {
      this.StudentslistService.deleteStudent(id).subscribe(data => {
        this.getAllStudents(this.user.InstituteId, this.user.BranchId);
      })
    }
  }

  openEditStudentPopup(editStudent: TemplateRef<any>, s) {
    this.coursesService.courseTypeList().subscribe(res => {
      this.CourseTypeList = res
    });
    this.studentID = s.StudentId,
    this.thumbnailUrl = s.Photo
    this.registerUpdateStudent.patchValue({
      StudentId: s.StudentId,
      Gender: s.Gender,
      FirstName: s.FirstName,
      MiddleName: s.MiddleName,
      LastName: s.LastName,
      Address1: s.Address1,
      City: s.City,
      State: s.State,
      ZipCode: s.STDCode,
      DOB: formatDate(s.DOB, 'yyyy-MM-dd', 'en'),
      PAddress1: s.PAddress1,
      CourseType: s.CourseTypeId,
      Course: s.CourseId,
      PCity: s.PCity,
      PState: s.PState,
      PSTDCode: s.PSTDCode,
      BloodGroup: s.BloodGroup,
      Photo: s.Photo,
      ContactNo: s.ContactNo,
      EmergencyNo: s.EmergencyNo,
      Email: s.EmailId,
      IsDocumentSubmitted: s.IsDocumentSubmitted
    })

    this.studentsListService.getCourseNameFromCourseType(s.CourseTypeId).subscribe(res => {
      this.courseNameList = res
    });

    this.modalRef = this.modalService.show(editStudent, { class: 'modal-xl' })
  }

  selectCourseType(event) {
    this.studentsListService.getCourseNameFromCourseType(event.target.value).subscribe(res => {
      this.courseNameList = res
    });
  }

  onSubmitEditStudent() {
    this.submitted = true;
    if (this.registerUpdateStudent.invalid) {
      return
    }
    this.submitted = false;
    let body = {
      StudentId: this.studentID,
      Gender: this.registerUpdateStudent.controls.Gender.value,
      FirstName: this.registerUpdateStudent.controls.FirstName.value,
      MiddleName: this.registerUpdateStudent.controls.MiddleName.value,
      LastName: this.registerUpdateStudent.controls.LastName.value,
      Address1: this.registerUpdateStudent.controls.Address1.value,
      City: this.registerUpdateStudent.controls.City.value,
      State: this.registerUpdateStudent.controls.State.value,
      STDCode: this.registerUpdateStudent.controls.ZipCode.value,
      DOB: this.registerUpdateStudent.controls.DOB.value,
      PAddress1: this.registerUpdateStudent.controls.PAddress1.value,
      PCity: this.registerUpdateStudent.controls.PCity.value,
      PState: this.registerUpdateStudent.controls.PState.value,
      PSTDCode: this.registerUpdateStudent.controls.PSTDCode.value,
      BloodGroup: this.registerUpdateStudent.controls.BloodGroup.value,
      ContactNo: this.registerUpdateStudent.controls.ContactNo.value,
      EmergencyNo: this.registerUpdateStudent.controls.EmergencyNo.value,
      EmailId: this.registerUpdateStudent.controls.Email.value,
      IsDocumentSubmitted: this.registerUpdateStudent.controls.IsDocumentSubmitted.value,
      Course: this.registerUpdateStudent.controls.Course.value,
      CourseType: this.registerUpdateStudent.controls.CourseType.value,
      Photo: this.thumbnailUrl
    }

    this.StudentslistService.editStudent(body).subscribe(data => {
      this.getAllStudents(this.user.InstituteId, this.user.BranchId),
        this.modalRef.hide()
    })
  }

  openStudentDetailsPopup(studentDetails: TemplateRef<any>, selectedStudent) {
    this.studentID = selectedStudent.StudentId;
    this.urlDocument = selectedStudent.Document;
    this.studentDetails = selectedStudent;
    this.StudentslistService.getFeesTransactionDetails(this.studentID).subscribe(res => {
      this.feesTransaction = res;
    })
    this.modalRef = this.modalService.show(studentDetails, { class: 'modal-xl' })
  }

  showFeesTransactionTemplate(StudentFees: TemplateRef<any>, _payStudent: Students) {
    this.StudentFeesForm.reset();
    this.StudentslistService.getFeesTransactionDetails(_payStudent.StudentId).subscribe(res => {
      this.feesTransaction = res;
      let totalPaid = 0;
      this.feesTransaction.forEach(x => totalPaid += x.FeesPaid);
      _payStudent.PendingFees = _payStudent.TotalFees - totalPaid;
      this.getPendingFees = _payStudent.TotalFees - totalPaid;
    })
    this.modalRef = this.modalService.show(StudentFees, { class: 'modal-xl' })
    this.payStudent = _payStudent;
    console.log(this.payStudent);
  }

  onImageSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerUpdateStudent.get('Photo').setValue(file);
    }
  }

  onUploadPhoto() {
    const formData = new FormData();
    formData.append('profile', this.registerUpdateStudent.get('Photo').value);
    this.StudentslistService.postPhoto(formData).subscribe(
      res => {
        if (res['type'] == 4) {
          this.thumbnailUrl = 'Http://' + res['body']['Message'];
        }
      }
    );
  }

  onSubmitStudentFees(student) {
   let body = {
      StudentId: student.StudentId,
      CourseId: student.CourseId,
      DateOfPayment: new Date(),
      FeesPaid: this.StudentFeesForm.controls.FeesAmount.value,
      FeesTakenBy: this.user.userId,
      PendingFees: this.getPendingFees - this.StudentFeesForm.controls.FeesAmount.value
    }
    this.StudentslistService.onSubmitStudentFees(body).subscribe(data => {
      this.payStudent;
      if (data != null)
        this.getAllStudents(this.user.InstituteId, this.user.BranchId);
    })
  }

}
