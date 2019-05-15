import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentslistService } from './studentslist.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {formatDate} from '@angular/common';
import {Students,UpdateStudent} from '../Models/Students'
//import { template } from '@angular/core/src/render3';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  modalRef:BsModalRef
  [x: string]: any;
  returnUrl:string;
  studentID:number;
  submitted:boolean;
  registerUpdateStudent:FormGroup;
  
  public students=[];

  constructor(private modalService: BsModalService,private router: Router,
    private StudentslistService:StudentslistService, private formBuilder:FormBuilder,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl='/create-student';
    this.getAllStudents();


    this.registerUpdateStudent =this.formBuilder.group({

      Gender:['',Validators.required],
      FirstName:['',Validators.required],
      MiddleName:['',Validators.required],
      LastName:['',Validators.required],
      DOB:['',Validators.required],
      BloodGroup:['',Validators.required],
      ContactNo:['',Validators.required],
      EmergencyNo:['',Validators.required],
      Address1:['',Validators.required],
      Address2:['',Validators.required],
      City:['',Validators.required],
      State:['',Validators.required],
      P_Address1:['',Validators.required],
      P_Address2:['',Validators.required],
      P_City:['',Validators.required],
      P_State:['',Validators.required],
      P_STDCode:['',Validators.required],
      //Photo:['',Validators.required],
      Email:['',Validators.required],
      ZipCode:['',Validators.required],
      IsDocumentSubmitted:[],

    })


  }

  addNewStudent(){
    this.router.navigate([this.returnUrl]);
  }

  getAllStudents(){
    debugger;
    this.StudentslistService.getAllStudents().subscribe(res=>this.students=res);
  }

  deleteStudent(id:number){
    debugger;
    if(confirm("Are you sure to delete ")){
    this.StudentslistService.deleteStudent(id).subscribe(data=>this.GetAllStudents())}

  }


  openEditStudentPopup(editStudent:TemplateRef<any>, s){
      debugger;

      this.studentID=s.StudentId,
      this.registerUpdateStudent.patchValue({
        StudentId:s.StudentId,
        Gender:s.Gender,
        FirstName:s.FirstName,
        MiddleName:s.MiddleName,
        LastName:s.LastName,
        Address1:s.Address1,
        Address2:s.Address2,
        City:s.City,
        State:s.State,
        ZipCode:s.STDCode,
        DOB:formatDate(s.DOB, 'yyyy-MM-dd', 'en'),
        P_Address1:s.PAddress1,
        P_Address2:s.PAddress2,
        P_City:s.PCity,
        P_State:s.PState,
        P_STDCode:s.PSTDCode,
        BloodGroup:s.BloodGroup,
        //Course:s.Course,
        //DateOfJoining:s.DateOfJoining,
        ContactNo:s.ContactNo,
        EmergencyNo:s.EmergencyNo,
        Email:s.EmailId,
        IsDocumentSubmitted:s.IsDocumentSubmitted
      })

      this.modalRef=this.modalService.show(editStudent)
    }

    onSubmitEditStudent(){
      debugger;

      this.submitted=true;
      if(this.registerUpdateStudent.invalid){
        return
      }

      let body : UpdateStudent= {
        StudentId:this.studentID,
        Gender:this.registerUpdateStudent.controls.Gender.value,
        FirstName:this.registerUpdateStudent.controls.FirstName.value,
        MiddleName:this.registerUpdateStudent.controls.MiddleName.value,
        LastName:this.registerUpdateStudent.controls.LastName.value,
        Address1:this.registerUpdateStudent.controls.Address1.value,
        Address2:this.registerUpdateStudent.controls.Address2.value,
        City:this.registerUpdateStudent.controls.City.value,
        State:this.registerUpdateStudent.controls.State.value,
        STDCode:this.registerUpdateStudent.controls.ZipCode.value,
        DOB:this.registerUpdateStudent.controls.DOB.value,
        PAddress1:this.registerUpdateStudent.controls.P_Address1.value,
        PAddress2:this.registerUpdateStudent.controls.P_Address2.value,
        PCity:this.registerUpdateStudent.controls.P_City.value,
        PState:this.registerUpdateStudent.controls.P_State.value,
        PSTDCode:this.registerUpdateStudent.controls.P_STDCode.value,
        BloodGroup:this.registerUpdateStudent.controls.BloodGroup.value,
        // //Course:this.registerUpdateStudent.controls.StudentId.value,
        // DateOfJoining:this.registerUpdateStudent.controls.DateOfJoining.value,
        ContactNo:this.registerUpdateStudent.controls.ContactNo.value,
        EmergencyNo:this.registerUpdateStudent.controls.EmergencyNo.value,
        EmailId:this.registerUpdateStudent.controls.Email.value,
        IsDocumentSubmitted:this.registerUpdateStudent.controls.IsDocumentSubmitted.value,
      }

      if(confirm("Do you want to Save Changes?")){
      this.StudentslistService.editStudent(body).subscribe(data=>{this.GetAllStudents(),this.modalRef.hide()})
    }

      
    }

    showUpload() {

      this.showSelected = true;
    }
  
    hideUpload() {
      this.showSelected = false;
    }

    printPage(){
      window.print();
    }

    get f() {return this.registerUpdateStudent.controls}


}
