import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import{LeaveService} from './leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  LeaveForm: FormGroup;
  submitted = false;
  modalRef: any;
  public LeaveTran = [];

  constructor(private formBuilder: FormBuilder,private modalService:BsModalService,private LeaveService:LeaveService) { }

  ngOnInit() {
    this.LeaveForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      courseName: ['', Validators.required],
      leave: ['', Validators.required],
    });
    this.getLeaveList();
  }
  get f() { return this.LeaveForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.LeaveForm.invalid) {
      return;
  }

  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.LeaveForm.value))

}
public Leave(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

getLeaveList(){
  this.LeaveService.getLeave().subscribe(res =>this.LeaveTran = res);
    //console.log(JSON.stringify(this.LeaveTran));
  //});
}
}
