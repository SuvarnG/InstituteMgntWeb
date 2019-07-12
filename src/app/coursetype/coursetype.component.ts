import { Component, OnInit, TemplateRef } from '@angular/core';
import { CoursetypeService } from './coursetype.service';
import { CourseType } from '../Models/Students';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private CoursetypeService: CoursetypeService,
    private modalService: BsModalService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4

    };
    this.getCourseType();

    this.createregisterForm = this.formBuilder.group({
      CourseTypeName:['',Validators.required]
});
  this.editregisterForm = this.formBuilder.group({
     CourseTypeId:['',Validators.required],
     CourseTypeName:['',Validators.required]
  });

}

  get f() { return this.createregisterForm.controls; }
  get fu() { return this.editregisterForm.controls; }

  getCourseType(){
    this.CoursetypeService.courseTypeList().subscribe(res=> {
      this.courseType=res;
      this.dtTrigger.next();
    });
  }

  //Create CourseType
  createNewCourse(addtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addtemplate, {
      animated: true,
      backdrop: 'static'
    });
    
  };

  // onSubmit() {

  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.createregisterForm.invalid) {
  //     return;
  //   }
  //   this.submitted = false;
  // }

  createCourseName(CreateCourseName: string) {
    this.submitted = true;
    if (this.createregisterForm.invalid) {
      return;
    }
    this.submitted = false;

    this.CoursetypeService.createCourseType(CreateCourseName).subscribe(data => {
      this.modalRef.hide();
      this.getCourseType();
    }, error => console.error(error))
  }


  editCourseType(editTemplate: TemplateRef<any>,coursetype){
    this.editregisterForm.patchValue(coursetype);
    this.modalRef = this.modalService.show(editTemplate);
  }

  updateCourseType() {
    this.submitted=true;  
    //stop here if form is invalid
    if(this.editregisterForm.invalid){
      return;
    }
    let body={
      CourseTypeName:this.editregisterForm.controls.CourseTypeName.value,
      CourseTypeId:this.editregisterForm.controls.CourseTypeId.value,
    }
    this.CoursetypeService.editCourseType(body).subscribe(data => {
      this.modalRef.hide();
      this.getCourseType();
     }, error => console.error(error))
  }

  clearForm()
  {
    this.createregisterForm.reset()
  }

  
}
