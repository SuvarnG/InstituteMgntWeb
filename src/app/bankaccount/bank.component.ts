import { Component, OnInit, TemplateRef, Input,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { BankService } from './bank.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Bank } from '../Model/Bank';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MustMatch } from './must-match.validator'
import { debounceTime } from 'rxjs/operators';
import { Type } from '@angular/compiler';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnDestroy, OnInit {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  returnUrl: string;
  @Input() name: string;
  public ID: number;
  public banks = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private router: Router,
    private BankService: BankService,
    private route: ActivatedRoute) { }
  
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }

  ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5
  
      };
    this.registerForm = this.formBuilder.group({
      ID: [],
      BankName: ['', Validators.required],
      AccountNo: ['', [Validators.required, Validators.minLength(12)]],
      ReAccountNo: ['', Validators.required],
      IFSC_Code: ['', Validators.required],
      AccountType: ['', Validators.required]
    }, {
        validator: MustMatch('AccountNo', 'ReAccountNo')
      });

    this.getBanks();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      let body = {
        ID: this.registerForm.controls.ID.value,
        BankName: this.registerForm.controls.BankName.value,
        AccountNo: this.registerForm.controls.AccountNo.value,
        AccountType: this.registerForm.controls.AccountType.value,
        IFSC_Code: this.registerForm.controls.IFSC_Code.value,

      };
      this.BankService.Bank(body).subscribe((data) => {
        this.modalRef.hide();
        this.getBanks();

      })
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });


  }

  getBanks() {

    this.BankService.bankList().subscribe(res => {
      this.banks = res;
      this.dtTrigger.next();
    });
//    console.log(JSON.stringify(this.banks));
  }

  Delete(ID) {
    var ans = confirm("Do you want to delete BankId : " + ID);
    if (ans) {
      this.BankService.Delete(ID).subscribe(data => {
        this.getBanks();
      }, error => console.error(error))
    }
  }

  EditAccNo(editTemplate: TemplateRef<any>, bank) {
    debugger;
    let selectedBank = {
      ID: bank.ID,
      BankName: bank.BankName,
      AccountType: bank.AccountType,
      IFSC_Code: bank.IFSC_Code
    }
    this.registerForm.patchValue(selectedBank);
    this.modalRef = this.modalService.show(editTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }

  UpdateAccNo() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    debugger;
    console.log(this.f)
    let body = {
      AccountNo: this.registerForm.controls.AccountNo.value,
      ID: this.registerForm.controls.ID.value,
      BankName: this.registerForm.controls.BankName.value,
      AccountType: this.registerForm.controls.AccountType.value,
      IFSC_Code: this.registerForm.controls.IFSC_Code.value

    }
    this.BankService.EditAccNo(body).subscribe(data => {
      this.modalRef.hide();
      this.getBanks();
    }, error => console.error(error))
  }
}




