import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EnquiryService } from './enquiry.service';
import { EnquiryList, CourseNameMaster, CourseTypeMaster } from '../models/EnquiryList';
import { createEnquiry } from '../models/createEnquiry';
import { validateConfig } from '@angular/router/src/config';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})

export class EnquiryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  EnquiryForm: FormGroup;
  UpdateEnquiryFormGroup: FormGroup;
  submitted = false;
  myDateValue: Date;
  modalRef: any;
  //enquiryService: any;
  public enquiries: EnquiryList[];
  route: any;
  CourseTypeId: Number;
  CourseId: Number;
  ID: any;
  listCourseType: CourseTypeMaster[];
  listCourseName: any;
  minDate: Date;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private enquiryService: EnquiryService) { }

  ngOnInit() {

    this.dtOptions = {
      retrieve: true,
      //paging: false,
      pagingType: 'full_numbers',
      pageLength: 5

    };
    this.myDateValue = new Date();
    this.EnquiryForm = this.formBuilder.group({
      ID: 0,
      CourseId: ['', Validators.required],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['Kondhwa', Validators.required],
      City: ['Pune', Validators.required],
      DateOfEnquiry: [new Date().toDateString(), Validators.required],
      IsFollowupNeeded: [],
      //CourseName:['',Validators.required],
      NeedFollowupDate: [],
      Remark: ['', Validators.required],
      CourseTypeId: ['', Validators.required],
    });

    this.UpdateEnquiryFormGroup = this.formBuilder.group({
      ID: [],
      CourseId: ['', Validators.required],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      DateOfEnquiry: [new Date().toString(), Validators.required],
      IsFollowupNeeded: [],
      NeedFollowupDate: [],
      Remark: ['', Validators.required],
      CourseTypeId: ['', Validators.required],
    });
    this.getEnquiryList();
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  // convenience getter for easy access to form fields
  get f() { return this.EnquiryForm.controls; }
  get fu() { return this.UpdateEnquiryFormGroup.controls; }

  public OpenEnquiryModel(CreateEnquiryModal: TemplateRef<any>) {

    //debugger;
    if (!this.listCourseType) {
      this.GetCourseTypeList();
    }
    this.modalRef = this.modalService.show(CreateEnquiryModal, {
      backdrop: 'static'
    });
  }

  getEnquiryList() {
    this.enquiryService.getEnquiry().subscribe(res => {
      this.enquiries = res;
      console.log(JSON.stringify(this.enquiries));
      this.dtTrigger.next();
    });
  }

  CreateNewEnquiry() {
    //debugger;
    console.log(this.EnquiryForm);
    this.submitted = true;
    // stop here if form is invalid
    if (this.EnquiryForm.invalid) {
      return;
    }
    let req = {
      ID: 0,
      FirstName: this.EnquiryForm.controls.FirstName.value,
      MiddleName: this.EnquiryForm.controls.MiddleName.value,
      LastName: this.EnquiryForm.controls.LastName.value,
      Address: this.EnquiryForm.controls.Address.value,
      City: this.EnquiryForm.controls.City.value,
      CourseTypeId: this.EnquiryForm.controls.CourseTypeId.value,
      NeedFollowupDate: this.EnquiryForm.controls.NeedFollowupDate.value,
      Remark: this.EnquiryForm.controls.Remark.value,
      DateOfEnquiry: this.EnquiryForm.controls.DateOfEnquiry.value,
      CourseId: this.EnquiryForm.controls.CourseId.value,
    };
    this.enquiryService.createEnquires(req).subscribe(data => {
      this.modalRef.hide()
      this.getEnquiryList();
      this.EnquiryForm.reset();
      this.submitted = false;
    });
  }


  selectCourseTypeName(event) {
    //debugger;
    this.CourseTypeId = event.target.value;
  }

  selectCourseNameForCourseType(event) {
    //debugger;
    this.GetCourseNameList(event.target.value);
  }


  // <!-- Edit Enquiry modal -->
  UpdateEnquiryModal(editEnquiryModal: TemplateRef<any>, editItem: createEnquiry) {

    //debugger;
    this.modalRef = this.modalService.show(editEnquiryModal, {
      backdrop: 'static'
    });

    this.GetCourseTypeList();
    this.UpdateEnquiryFormGroup.patchValue({
      ID: editItem.ID,
      FirstName: editItem.FirstName,
      MiddleName: editItem.MiddleName,
      LastName: editItem.LastName,
      Address: editItem.Address,
      City: editItem.City,
      DateOfEnquiry: new Date(editItem.DateOfEnquiry).toDateString(),
      // IsFollowupNeeded: editItem.NeedFollowupDate ? true : false,
      NeedFollowupDate: editItem.NeedFollowupDate,
      Remark: editItem.Remark,
      CourseId: editItem.CourseId
    })
  }

  UpdateEnquiry() {
    //debugger;
    console.log(this.fu);
    this.submitted = true;
    if (this.UpdateEnquiryFormGroup.invalid) {
      return
    }
    let res = {
      ID: this.fu.ID.value,
      FirstName: this.fu.FirstName.value,
      MiddleName: this.fu.MiddleName.value,
      LastName: this.fu.LastName.value,
      Address: this.fu.Address.value,
      City: this.fu.City.value,
      DateOfEnquiry: this.fu.DateOfEnquiry.value,
      // IsFollowUpNeeded: this.fu.IsFollowUpNeeded.value,
      NeedFollowupDate: this.fu.NeedFollowupDate.value,
      Remark: this.fu.Remark.value,
      CourseId: this.fu.CourseId.value
    }

    this.enquiryService.EnquiryUpdate(res).subscribe(data => { this.getEnquiryList(), this.modalRef.hide() })
  }


  private GetCourseTypeList() {
    //debugger;
    this.enquiryService.GetCourseTypeList().subscribe(res => {
      this.listCourseType = res;
      console.log(JSON.stringify(this.listCourseType));
    });
  }

  private GetCourseNameList(id: number) {
    //debugger;
    this.enquiryService.GetCourseNameList(id).subscribe(res => {
      this.listCourseName = res;
      console.log(JSON.stringify(this.listCourseName))
    });

  }

}

