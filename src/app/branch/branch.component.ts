import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Branch } from '../Model/Branch';
import { BranchService } from './branch.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  modalRef: BsModalRef;
  CreateBranchForm: FormGroup;
  submitted = false;
  returnUrl: string;
  errorMessage:string;
  Branch:Branch[];
  EditBranchForm:FormGroup;
  branchID:number;
  constructor(private modalService: BsModalService,private formBuilder: FormBuilder, private router: Router,private BranchService:BranchService) { }

  ngOnInit() {
    this.CreateBranchForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      Address: ['', [Validators.required,Validators.minLength(6)]],
      ContactNo: ['', Validators.required]
    });
    this.EditBranchForm=this.formBuilder.group({
      BranchName: ['', Validators.required],
      Address: ['', [Validators.required,Validators.minLength(6)]],
      ContactNo: ['', Validators.required]
    });
    this.getBranchList();
  }
getBranchList(){
  debugger;
  this.BranchService.getBranches().subscribe(res=>this.Branch=res);
}

  openPopupForNew(NewBranchTemplate: TemplateRef<any>){
    this.modalRef = this.modalService.show(NewBranchTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }

  openPopupForEdit(EditBranchTemplate: TemplateRef<any>,branch){
    debugger;
    this.branchID=branch.BranchId;
    let body={
      BranchName:branch.BranchName,
      Address:branch.Address,
      ContactNo:branch.ContactNo
    } 
    this.EditBranchForm.patchValue(body);
    this.modalRef = this.modalService.show(EditBranchTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }
  onSubmitCreateBranch()
  {
    debugger;
    if (this.CreateBranchForm.invalid==true) {
      this.submitted = true;
      return;
     }
     else{
      this.submitted = false;
      let body ={
        BranchName:this.CreateBranchForm.controls.BranchName.value,
        Address:this.CreateBranchForm.controls.Address.value,
        ContactNo:this.CreateBranchForm.controls.ContactNo.value
      };
  this.BranchService.CreateNewBranch(body).subscribe((data) => {  
    this.modalRef.hide();
    this.getBranchList();
  }, error => this.errorMessage = error) 
  }
}

onSubmitEditBranch(){
  debugger;
 let body={
   BranchId:this.branchID,
  BranchName:this.EditBranchForm.controls.BranchName.value,
  Address:this.EditBranchForm.controls.Address.value,
  ContactNo:this.EditBranchForm.controls.ContactNo.value
 } 

 this.BranchService.EditBranch(body)  
 .subscribe((data) => {  
   this.modalRef.hide();
   this.getBranchList();   
 }, error => this.errorMessage = error)
}

get f()
{ 
  return this.CreateBranchForm.controls; 
}
}
