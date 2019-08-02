import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LeavelistService } from './leavelist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Leaves, UpdateLeaves } from '../Model/leaves';
import { FormGroup, FormBuilder, Validators, NgControl } from '@angular/forms';
import { idLocale } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.css']
})

export class LeavesListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;
  submitted = false;
  registerUpdateLeave: FormGroup;
  registerCreateLeave: FormGroup;
  public Leaves = [];
  public UpdateLeaves = [];
  filter:any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private LeavelistService: LeavelistService,
    private formBuilder: FormBuilder,
    private router: Router, 
    private route: ActivatedRoute, 
    private modalService: BsModalService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging:false,
      searching:false
    };

    this.getAllLeaves();

    this.registerUpdateLeave = this.formBuilder.group({
      LeaveId: ['', Validators.required],
      LeaveType: ['', Validators.required]
    },
    );

    this.registerCreateLeave = this.formBuilder.group({
      LeaveName: ['', Validators.required]
    },
    );
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

  get m() { return this.registerUpdateLeave.controls }

  get n() { return this.registerCreateLeave.controls }

  getAllLeaves() {
    this.LeavelistService.getAllLeaves().subscribe(res => {
    this.Leaves = res
    this.rerender();
    });
  }

  deleteLeaveType(id: number,name:string) {
    var ans = confirm("Do you want to delete leave of type: " + name);
    if (ans) {
      this.LeavelistService.deleteLeaveType(id).subscribe(data =>
        this.getAllLeaves()
      )
    }   
  };

  createNewLeave(template: TemplateRef<any>) {
    this.registerCreateLeave.reset();
    this.modalRef = this.modalService.show(template);
  };

  updateNewLeave(template: TemplateRef<any>, LeaveType) {
    let body = {
      LeaveType: LeaveType
    }
    this.registerUpdateLeave.patchValue(body);
    this.modalRef = this.modalService.show(template);
  };

  onSubmitUpdate() {
    this.submitted = true;
    //stop here if form is invalid
    if (this.registerUpdateLeave.invalid) {
      return;
    }
  }

  onSubmitCreate(Leaves) {
    this.submitted = true;
    //stop here if form is invalid
    if (this.registerCreateLeave.invalid) {
      return;
    }
    for(var i=0;i<Leaves.length;i++)
{
  if(this.registerCreateLeave.controls.LeaveName.value==Leaves[i].LeaveType){
    alert("Duplicate Leave Type Not Allowed.");
  }
}

    let leaveName=this.registerCreateLeave.controls.LeaveName.value
    this.LeavelistService.createLeave(leaveName).subscribe(data => { this.getAllLeaves(), 
      this.rerender();          
      this.modalRef.hide() })
  }

  updateLeave(leaves: Leaves) {
    
    this.submitted = true;
    //stop here if form is invalida
    if (this.registerUpdateLeave.invalid) {
      return;
    }

    let body: Leaves = {
      LeaveId: this.registerUpdateLeave.controls.LeaveId.value,
      LeaveType: this.registerUpdateLeave.controls.LeaveType.value
    }

    this.LeavelistService.updateLeave(body).subscribe(data => { this.getAllLeaves(), 
            this.rerender();  
            this.modalRef.hide() })
  }


}
