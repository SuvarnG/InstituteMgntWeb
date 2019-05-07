import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherCoursesService } from './teacher-courses.service';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  shown:boolean = false;
  add:boolean=true;
  modalRef: BsModalRef;
  registerForm: FormGroup;
    submitted = false;

  constructor(private modalService: BsModalService, private  formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private teacherCoursesService: TeacherCoursesService

    ) {}
  

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      inputAddress1:['', Validators.required],
      inputAddress2:['', Validators.required],
      inputCity:['', Validators.required],
      inputState:['', Validators.required],
      inputSTD:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      inputContactNo:['', [Validators.required, Validators.maxLength(10)]],
      inputEmergencyContactNO:['', [Validators.required, Validators.maxLength(10)]]
  });

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

    alert("Success");
    }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  Show(){
    if(this.shown==false){
        this.shown = true;
    }
  }
  Hide(){
    if(this.shown==true){
      this.shown=false;
  }
}
addNewRow(){
  if(this.add==true)
  {
    alert("test");
  }
}

}
