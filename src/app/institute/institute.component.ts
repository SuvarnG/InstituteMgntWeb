import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { InstituteService } from './institute.service';
import {Institutes} from '../shared/Model/Institutes'
import { FormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Utils } from './../Utils';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InstituteAdminService } from '../Admin/Services/institute-admin.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})
export class InstituteComponent implements OnInit {

  Institutes:Institutes[]; 
  instituteId:number;
  createInstituteForm:FormGroup;
  editInstituteForm:FormGroup;
  submitted=false;
  chkInstitute:any;
  modalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  p:any;
  filter:any;
  chkEmailId:any

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private instituteService:InstituteService,
              private formBuilder:FormBuilder,
              private modalService: BsModalService,
              private instituteAdminService:InstituteAdminService) { }

  ngOnInit() {

    this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 8,
      paging:true,
      searching:false,
      processing: true
    };

    this.createInstituteForm = this.formBuilder.group({
      InstituteName:['', Validators.required],
      OwnerName:['',Validators.required],
      Address:['', Validators.required],
      ContactNo:['', [Validators.required,Validators.minLength,Validators.maxLength]],
      EmailId:['', [Validators.required,Validators.email]]

    })

    this.editInstituteForm=this.formBuilder.group({
      InstituteName:['', Validators.required],
      OwnerName:['',Validators.required],
      Address:['', Validators.required],
      ContactNo:['', [Validators.required,Validators.minLength,Validators.maxLength]],
      EmailId:['', [Validators.required,Validators.email]]
    })
    
    this.getAllInstitutes();

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

  get f() {return this.createInstituteForm.controls}

  get fu() {return this.editInstituteForm.controls}

  getAllInstitutes(){
    this.instituteService.getAllInstitutes().subscribe(data=>{
      this.Institutes = data;
      //this.dtTrigger.next();
      this.rerender();
    })
  }

  public user= Utils.GetCurrentUser();


  openCreateInstituteModal(newInstituteTemplate:TemplateRef<any>){
    this.modalRef = this.modalService.show(newInstituteTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    })
  }

  createInstitute(){
    this.submitted=true;
    if(this.createInstituteForm.invalid || this.chkEmailId>0){
      return;
    }
    this.submitted=false;
    let body={
      Id:0,
      InstituteName: this.createInstituteForm.controls.InstituteName.value,
      Address: this.createInstituteForm.controls.Address.value,
      Owner:this.createInstituteForm.controls.OwnerName.value,
      Contact:this.createInstituteForm.controls.ContactNo.value,
      Email:this.createInstituteForm.controls.EmailId.value,
      CreatedBy:this.user.userId
    }

    this.instituteService.createInstitute(body).subscribe(data=>{
      this.getAllInstitutes();
      this.rerender();
      this.modalRef.hide();
    })
  }


  openEditInstituteModal(editInstituteTemplate:TemplateRef<any>,i){

    this.instituteId = i.Id
    let body = {
      InstituteName:i.InstituteName,
      OwnerName:i.Owner,
      Address:i.Address,
      ContactNo:i.Contact,
      EmailId:i.Email
    }
    this.editInstituteForm.patchValue(body);

    this.modalRef = this.modalService.show(editInstituteTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    })


  }


  editInstitute(){ 
    this.submitted=true;
    if(this.editInstituteForm.invalid || this.chkEmailId>0){
      return;
    }
    this.submitted=false;
    let body={
      Id:this.instituteId,
      InstituteName: this.editInstituteForm.controls.InstituteName.value,
      Address: this.editInstituteForm.controls.Address.value,
      Owner:this.editInstituteForm.controls.OwnerName.value,
      Contact:this.editInstituteForm.controls.ContactNo.value,
      Email:this.editInstituteForm.controls.EmailId.value,
      UpdatedBy:this.user.userId
    }

    this.instituteService.updateInstitute(body).subscribe(data=>{
      this.getAllInstitutes();
      this.rerender();
      this.modalRef.hide()
    })

  }


  deleteInstitute(id:number,InstituteName:string){
      if(confirm('Do you want to delete: ' + InstituteName)){
        this.instituteService.deleteInstitute(id).subscribe(data=>{
          this.chkInstitute=data;
          if(this.chkInstitute>0){
            alert('Sorry, You cannot delete this institute as it has active admin users.')
          }
          this.getAllInstitutes();
          this.rerender();          
        })
      }
  }


  validatingExistingUserEmail(EmailId:string){
    return this.instituteAdminService.validatingExistingUserEmail(EmailId).subscribe(data=>{
      this.chkEmailId=data;
    })
}



  onCancel(){
    this.submitted=false;
    this.modalRef.hide();
    this.chkEmailId=0;
  }

}
