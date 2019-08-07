import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CoursetypeService } from './coursetype.service';
import { CourseType } from '../Model/Students';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

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
  filter:any;


  @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

  constructor(private CoursetypeService: CoursetypeService,
    private modalService: BsModalService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging:false,
      searching:false
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

ngAfterViewInit(): void {this.dtTrigger.next();}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
  });
}

  get f() { return this.createregisterForm.controls; }
  get fu() { return this.editregisterForm.controls; }

  getCourseType(){
    this.CoursetypeService.courseTypeList().subscribe(res=> {
      this.courseType=res;
      this.rerender();
      //this.dtTrigger.next();
    });
  }

  //Create CourseType
  createNewCourse(addtemplate: TemplateRef<any>) {
    this.createregisterForm.reset();
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

  createCourseName(CreateCourseName: string,courseTypeName=[]) {
    debugger;
    this.submitted = true;
    if (this.createregisterForm.invalid) {
      return;
    }

    for(let i=0;i<courseTypeName.length;i++){
      if(CreateCourseName.toLowerCase()==courseTypeName[i]['CourseTypeName'].toLowerCase()){
        alert('Sorry, This coursetype is already in the list')
        return

      }
    }



    this.submitted = false;

    this.CoursetypeService.createCourseType(CreateCourseName).subscribe(data => {
      this.modalRef.hide();
      this.getCourseType();
      this.rerender();
    }, error => console.error(error))
  }


  editCourseType(editTemplate: TemplateRef<any>,coursetype){
    this.editregisterForm.patchValue(coursetype);
    this.modalRef = this.modalService.show(editTemplate,{
      animated: true,
      backdrop: 'static'
    });
  }

  updateCourseType(courseTypeName=[]) {
    this.submitted=true;  
    //stop here if form is invalid
    if(this.editregisterForm.invalid){
      return;
    }

    for(let i=0;i<courseTypeName.length;i++){
      if(this.editregisterForm.controls.CourseTypeName.value.toLowerCase()==courseTypeName[i]['CourseTypeName'].toLowerCase()){
        alert('Sorry, This coursetype is already in the list')
        return

      }
    }

    this.submitted=false;
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
