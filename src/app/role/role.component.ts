import { Component, OnInit, TemplateRef } from '@angular/core';
// import { stringify } from '@angular/core/src/render3/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoleService } from './role.service';
import { Roles } from '../Model/Roles';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})

export class RoleComponent {
  modalRef: BsModalRef;
  returnUrl: string;
  registerForm: FormGroup;
  submitted = false;
  public roles: Roles[];
  public ID:number;


  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private router: Router,
    private RoleService: RoleService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: ['', Validators.required]

    });

    this.getRoles();
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
  }

  // openModal1(template1: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template1, {
  //     animated: true,
  //     backdrop: 'static'
  //   });
  // }

  // ListModal(template1: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template1, {
  //     animated: true,
  //     backdrop: 'static'
  //   });

  // }

  getRoles() {
    this.RoleService.roleList().subscribe(res => this.roles = res);
    console.log(JSON.stringify(this.roles));
  }


  Delete(roleID) {
    var ans = confirm("Do you want to delete Role with Id: " + roleID);
    if (ans) {
      this.RoleService.deleteRole(roleID).subscribe(data => {
        this.getRoles();
      }, error => console.error(error))
    }
  }



  CreateRole(RoleName: string) {
    this.RoleService.CreateRole(RoleName).subscribe(data => {
      this.modalRef.hide();
      this.getRoles();
    }, error => console.error(error))
  }

  EditRole(editTemplate: TemplateRef<any>,role){
    debugger;
this.ID=role.roleID;
    let body={
      role:role.RoleName
    }
    this.registerForm.patchValue(body);
    this.modalRef = this.modalService.show(editTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }
  UpdateRole() {
    debugger;
    let body={
      RoleName:this.registerForm.controls.role.value,
      roleId:this.ID
    }
    this.RoleService.EditRole(body).subscribe(data => {
      this.modalRef.hide();
      this.getRoles();
     }, error => console.error(error))
  }

}

