import { Component, OnInit, TemplateRef } from '@angular/core';
import { CoursetypeService } from './coursetype.service';
import { CourseType } from '../Models/Students';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-coursetype',
  templateUrl: './coursetype.component.html',
  styleUrls: ['./coursetype.component.css']
})
export class CoursetypeComponent  {
  modalRef: BsModalRef;
  createregisterForm: FormGroup;
  editregisterForm:FormGroup;
  submitted = false;
  returnUrl: string;
 
  public ID:number;
  public courseType: CourseType[];

  constructor(private CoursetypeService: CoursetypeService,private modalService: BsModalService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCourseType();

    this.createregisterForm = this.formBuilder.group({
     // CourseTypeId:['',Validators.required],
      CourseTypeName:['',Validators.required]
});
  this.editregisterForm = this.formBuilder.group({
     CourseTypeId:['',Validators.required],
     CourseTypeName:['',Validators.required]
  });

}

  get f() { return this.createregisterForm.controls; }
  get fu() { return this.editregisterForm.controls; }
//GetCourseType
  getCourseType(){
    this.CoursetypeService.CourseTypeList().subscribe(res=>this.courseType=res)
  }

  //Create CourseType
  CreateNewCourse(addtemplate: TemplateRef<any>) {
    
    this.modalRef = this.modalService.show(addtemplate, {
      animated: true,
      backdrop: 'static'
    });
    
  };

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.createregisterForm.invalid) {
      return;
    }
    this.submitted = false;
  }
  CreateCourseName(CreateCourseName: string) {
    this.CoursetypeService.CreateCourseType(CreateCourseName).subscribe(data => {
      this.modalRef.hide();
      this.getCourseType();
    }, error => console.error(error))
  }



  EditCourseType(editTemplate: TemplateRef<any>,coursetype){
    debugger;
  //  this.ID=coursetype.CourseTypeId;
  //   let body={
  //     coursetype:coursetype.CourseTypeName
  //   }
    this.editregisterForm.patchValue(coursetype);
    this.modalRef = this.modalService.show(editTemplate);
  }
  UpdateCourseType() {
    this.submitted=true;
  
    //stop here if form is invalid
    if(this.editregisterForm.invalid){
      return;
    }

    debugger;
    let body={
      CourseTypeName:this.editregisterForm.controls.CourseTypeName.value,
      CourseTypeId:this.editregisterForm.controls.CourseTypeId.value,
    }
    this.CoursetypeService.EditCourseType(body).subscribe(data => {
      this.modalRef.hide();
      this.getCourseType();
     }, error => console.error(error))
  }
  clearForm()
  {
    this.createregisterForm.reset()
  }

  
}
