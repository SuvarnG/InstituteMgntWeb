import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Branch } from '../shared/Model/Branch';
import { BranchService } from './branch.service';
import { Subject } from 'rxjs';
import { Utils } from './../Utils';
import { DataTableDirective } from 'angular-datatables';


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
  errorMessage: string;
  branch: Branch[];
  editBranchForm: FormGroup;
  branchID: number;
  chkBranchId:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  filter:any;

  @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private branchService: BranchService) { }

  ngOnInit() {
    this.dtOptions = {
      retrieve: false,
      pagingType: 'full_numbers',
      pageLength: 10,
      paging:true,
      searching:false
    };
    this.createBrachForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      Address: ['', [Validators.required, Validators.minLength(6)]],
      ContactNo: ['', Validators.required]
    });
    this.editBranchForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      Address: ['', [Validators.required, Validators.minLength(6)]],
      ContactNo: ['', Validators.required]
    });
    this.getBranchList();
  };

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

  public user = Utils.GetCurrentUser();

  getBranchList() {
    this.branchService.getBranches(this.user.InstituteId).subscribe(res => {
      this.branch = res;
      this.rerender();
      //this.dtTrigger.next();
    });
  }

  openPopupForNew(NewBranchTemplate: TemplateRef<any>) {
    this.createBrachForm.reset();
    this.modalRef = this.modalService.show(NewBranchTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }

  openPopupForEdit(EditBranchTemplate: TemplateRef<any>, branch) {
    this.branchID = branch.BranchId;
    let body = {
      BranchName: branch.BranchName,
      Address: branch.Address,
      ContactNo: branch.ContactNo
    }
    this.editBranchForm.patchValue(body);
    this.modalRef = this.modalService.show(EditBranchTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }
  onSubmitCreateBranch() {
    if (this.createBrachForm.invalid == true) {
      this.submitted = true;
      return;
    }
    else {
      this.submitted = false;
      let body = {
        BranchName: this.createBrachForm.controls.BranchName.value,
        Address: this.createBrachForm.controls.Address.value,
        ContactNo: this.createBrachForm.controls.ContactNo.value,
        InstituteId: this.user.InstituteId

      };
      this.branchService.createNewBranch(body).subscribe((data) => {
        this.modalRef.hide();
        this.getBranchList();
        this.rerender();
      }, error => this.errorMessage = error)
    }
  }

  onSubmitEditBranch() {
    this.submitted = true;
    if (this.editBranchForm.invalid) {
      return;
    }

    this.submitted=false;

    let body = {
      BranchId: this.branchID,
      BranchName: this.editBranchForm.controls.BranchName.value,
      Address: this.editBranchForm.controls.Address.value,
      ContactNo: this.editBranchForm.controls.ContactNo.value
    }

    this.branchService.editBranch(body)
      .subscribe((data) => {
        this.modalRef.hide();
        this.getBranchList();
        this.rerender();
      }, error => this.errorMessage = error)
  }

  get f() { return this.createBrachForm.controls}

  get g(){ return this.editBranchForm.controls}

  delete(id: number, branchName: any) {
    var ans = confirm("Do you want to delete this Branch: " + branchName);
    if (ans) {
      this.branchService.deleteBranch(id).subscribe(data => {
        this.chkBranchId=data;
        if(this.chkBranchId>0){
          alert('Sorry, Unable to delete this branch as it has active users.')
        }
        this.getBranchList();
      }, error => console.error(error))
    }
  }


  onCancel(){
    this.submitted=false;
    this.modalRef.hide();
  }
}
