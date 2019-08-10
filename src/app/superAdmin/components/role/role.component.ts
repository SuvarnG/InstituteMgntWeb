import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';
import { Roles } from 'shared/Model/Roles';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})

export class RoleComponent {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private router: Router,
    private RoleService: RoleService,
    private route: ActivatedRoute) { }

  modalRef: BsModalRef;
  returnUrl: string;
  createRoleForm: FormGroup;
  submitted = false;
  public roles: Roles[];
  public ID: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  filter: any;

  ngOnInit() {
    this.dtOptions = {
      retrieve: true,
      paging: false,
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false
    };
    
    this.getRoles();
  }

  ngAfterViewInit(): void { this.dtTrigger.next(); }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.createRoleForm.controls; }

  getRoles() {
    this.RoleService.roleList().subscribe(res => {
      this.roles = res;
      this.rerender();
      
    });

  }

}

