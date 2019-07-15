import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoleService } from './role.service';
import { Roles } from '../Model/Roles';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private router: Router,
    private RoleService: RoleService,
    private route: ActivatedRoute) { }

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }

  ngOnInit() {
    this.dtOptions = {
      retrieve:true,
      paging:true,
      pagingType: 'full_numbers',
      pageLength: 5
    };
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
    this.submitted = false;
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
  }

  getRoles() {
    this.RoleService.roleList().subscribe(res =>{
      this.roles = res;
      this.dtTrigger.next();
    //console.log(JSON.stringify(this.roles));
  });

  }

  Delete(roleID:number,roleName:any) {
    var ans = confirm("Do you want to delete this Role: " + roleName);
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
    let body={
      RoleName:this.registerForm.controls.role.value,
      roleId:this.ID
    }
    this.RoleService.EditRole(body).subscribe(data => {
      this.modalRef.hide();
      this.getRoles();
     }, error => console.error(error))
  }
  clearForm()
  {
    this.registerForm.reset()
  }

}

