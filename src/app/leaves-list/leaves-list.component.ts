import { Component, OnInit,TemplateRef } from '@angular/core';
import { LeavelistService } from './leavelist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Leaves,UpdateLeaves } from '../Models/leaves';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { idLocale } from 'ngx-bootstrap';
import { Subject } from 'rxjs';



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
  registerUpdateLeave:FormGroup;
  registerCreateLeave:FormGroup;
  public Leaves=[];
  public UpdateLeaves=[];

  constructor(private LeavelistService:LeavelistService,private formBuilder: FormBuilder,
    private router: Router,private route: ActivatedRoute,private modalService: BsModalService) { }

  ngOnInit() {
    this.dtOptions = {
      //   //retrieve: true,
      //   //paging: false,
         pagingType: 'full_numbers',
         pageLength: 5
  
       };
    this.GetAllLeaves();

    this.registerUpdateLeave = this.formBuilder.group({
      LeaveId:['',Validators.required],
      LeaveType:['',Validators.required]

    },
    );

    this.registerCreateLeave = this.formBuilder.group({
      LeaveName:['',Validators.required]

    },
    );
    
  }

  get m() {return this.registerUpdateLeave.controls}

  get n() {return this.registerCreateLeave.controls}

  GetAllLeaves(){
    this.LeavelistService.GetAllLeaves().subscribe(res=>
      {this.Leaves=res
    this.dtTrigger.next();
      });
  }

  DeleteLeaveType(id:number){
    debugger;
    
    this.LeavelistService.DeleteLeaveType(id).subscribe(data=>
      this.GetAllLeaves()
      )
  };

  CreateNewLeave(template: TemplateRef<any>) {
    
    this.modalRef = this.modalService.show(template);
    
  };

  UpdateNewLeave(template: TemplateRef<any>,LeaveId,LeaveType) {
    debugger;

   

    let body = {     
      LeaveId:LeaveId,
      LeaveType:LeaveType     
    }

    this.registerUpdateLeave.patchValue(body);
    this.modalRef = this.modalService.show(template);
};

  onSubmitUpdate(){
    debugger;
    this.submitted=true;
  
    //stop here if form is invalid
    if(this.registerUpdateLeave.invalid){
      return;
    }
    alert('Success!! \n\n' + JSON.stringify(this.registerUpdateLeave.value))
  }

  CreateLeave(leaveName:string){

    this.submitted=true;
  
    //stop here if form is invalid
    if(this.registerCreateLeave.invalid){
      return;
    }

    this.LeavelistService.CreateLeave(leaveName).subscribe(data=>{this.GetAllLeaves(),this.modalRef.hide()})
  }

  UpdateLeave(leaves:Leaves){

    this.submitted=true;
  
    //stop here if form is invalid
    if(this.registerUpdateLeave.invalid){
      return;
    }

    let body:Leaves={
      LeaveId:this.registerUpdateLeave.controls.LeaveId.value,
      LeaveType:this.registerUpdateLeave.controls.LeaveType.value
    }

    this.LeavelistService.UpdateLeave(body).subscribe(data=>{this.GetAllLeaves(),this.modalRef.hide()})
  }
  

}
