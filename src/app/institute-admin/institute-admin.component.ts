import { Component, OnInit, TemplateRef } from '@angular/core';
import { InstituteAdminService } from './institute-admin.service';
import {InstituteAdmins} from '../Model/Institutes'
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-institute-admin',
  templateUrl: './institute-admin.component.html',
  styleUrls: ['./institute-admin.component.css']
})
export class InstituteAdminComponent implements OnInit {

  instituteAdmins:InstituteAdmins[];
  createInstituteAdminForm:FormGroup;
  modalRef:BsModalRef;
  submitted= false;
  filter:any;
  p:any;
  students:any;

  constructor(private instituteAdminService:InstituteAdminService,
              private modalService: BsModalService,
              private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.createInstituteAdminForm = this.formBuilder.group({

    })

    this.getAllInstituteAdmins();

  }

  get f() {return this.createInstituteAdminForm.controls}

  getAllInstituteAdmins(){
    this.instituteAdminService.getAllInstituteAdmins().subscribe(data=>{
      this.instituteAdmins=data
    })
  }


  openCreateInstituteAdminModal(newInstituteAdminTemplate:TemplateRef<any>){
    this.modalService.show(newInstituteAdminTemplate,{
      animated: true,
      backdrop: 'static',
      class: 'modal-lg'
    })
  }

  createInstituteAdmin(){

    let body = {

    }
    this.instituteAdminService.createInstituteAdmin(body).subscribe(data=>{
      this.getAllInstituteAdmins();
    })
  }



  onCancel(){
    this.modalRef.hide();
    this.submitted=false;
  }

}
