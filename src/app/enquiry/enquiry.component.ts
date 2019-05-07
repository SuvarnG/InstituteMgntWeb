import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EnquiryService } from './enquiry.service';
import { EnquiryList } from '../models/EnquiryList';
import { createEnquiry } from '../models/createEnquiry';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})

export class EnquiryComponent implements OnInit {
  EnquiryForm: FormGroup;
  submitted = false;
  myDateValue: Date;
  modalRef: any;
  enquiryService: any;
  public EnquiryList = [];
  route: any;
  CourseTypeId:Number;
  

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private EnquiryService: EnquiryService) { }

  ngOnInit() {
    this.myDateValue = new Date();
    this.EnquiryForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middelName: ['', Validators.required],
      lastName: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      DateOfEnquiry: ['', Validators.required],
      NeedFollowupDate: ['', Validators.required],
      Remark: ['', Validators.required],

    });
    this.getEnquiryList();
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  get f() { return this.EnquiryForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.EnquiryForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.EnquiryForm.value))

  }
  public Enquiry(template: TemplateRef<any>) {
    
   this.EnquiryService.GetCourseTypeList();
    this.modalRef = this.modalService.show(template);
    
  }

  getEnquiryList() {

    this.EnquiryService.getEnquiry().subscribe(res => {
      this.EnquiryList = res;
      console.log(JSON.stringify(this.EnquiryList));
    });
     }

     CreateNewEnquiry(Enquiry:createEnquiry){
      
      let body: createEnquiry ={
        ID:this.EnquiryForm.controls.ID.value,
        FirstName:this.EnquiryForm.controls.firstName.value,
        MiddleName: this.EnquiryForm.controls.middelName.value,
        LastName:this.EnquiryForm.controls.lastName.value,
        Address:this.EnquiryForm.controls.Address.value,
        City:this.EnquiryForm.controls.City.value,
        CourseTypeName:this.EnquiryForm.controls.CourseTypeName.value,
        IsFollowupNeeded:this.EnquiryForm.controls.IsFollowupNeeded.value,
        NeedFollowupDate:this.EnquiryForm.controls.NeedFollowupDate.value,
        Remark:this.EnquiryForm.controls.Remark.value,
        DateOfEnquiry:this.EnquiryForm.controls.DateOfEnquiry.value
      };
       this.enquiryService.createEnquiry(body).subscribe()
     }

     selectCourseTypeName(event){
       this.CourseTypeId=event.target.value;
     }
  }
