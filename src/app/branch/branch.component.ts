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
  createBrachForm: FormGroup;
  submitted = false;
  returnUrl: string;
  errorMessage:string;
  branch:Branch[];
  editBranchForm:FormGroup;
  branchID:number;
  constructor(private modalService: BsModalService,private formBuilder: FormBuilder, private router: Router,private branchService:BranchService) { }

  ngOnInit() {
    this.createBrachForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      Address: ['', [Validators.required,Validators.minLength(6)]],
      ContactNo: ['', Validators.required]
    });
    this.editBranchForm=this.formBuilder.group({
      BranchName: ['', Validators.required],
      Address: ['', [Validators.required,Validators.minLength(6)]],
      ContactNo: ['', Validators.required]
    });
    this.getBranchList();
  }
getBranchList(){
  debugger;
  this.branchService.getBranches().subscribe(res=>this.branch=res);
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
    this.editBranchForm.patchValue(body);
    this.modalRef = this.modalService.show(EditBranchTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }
  onSubmitCreateBranch()
  {
    debugger;
    if (this.createBrachForm.invalid==true) {
      this.submitted = true;
      return;
     }
     else{
      this.submitted = false;
      let body ={
        BranchName:this.createBrachForm.controls.BranchName.value,
        Address:this.createBrachForm.controls.Address.value,
        ContactNo:this.createBrachForm.controls.ContactNo.value
      };
  this.branchService.createNewBranch(body).subscribe((data) => {  
    this.modalRef.hide();
    this.getBranchList();
  }, error => this.errorMessage = error) 
  }
}

onSubmitEditBranch(){
  debugger;
 let body={
   BranchId:this.branchID,
  BranchName:this.editBranchForm.controls.BranchName.value,
  Address:this.editBranchForm.controls.Address.value,
  ContactNo:this.editBranchForm.controls.ContactNo.value
 } 

 this.branchService.editBranch(body)  
 .subscribe((data) => {  
   this.modalRef.hide();
   this.getBranchList();   
 }, error => this.errorMessage = error)
}

get f()
{ 
  return this.createBrachForm.controls; 
}
delete(id:number) {
  debugger;
  console.log(id);
  var ans = confirm("Do you want to delete customer with Id: " + id);
  if (ans) {
    this.branchService.deleteBranch(id).subscribe(data => {
      this.getBranchList();
    }, error => console.error(error))
  }
}
}
