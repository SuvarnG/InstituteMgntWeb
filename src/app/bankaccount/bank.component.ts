import { Utils } from './../Utils';
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


  constructor(private modalService: BsModalService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private BankService: BankService,
    private route: ActivatedRoute) { }
  
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }

  ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 4
  
      };

    this.registerForm = this.formBuilder.group({
      ID: [],
      BankName: ['', Validators.required],
      AccountNo: ['', [Validators.required, Validators.minLength(12)]],
      ReAccountNo: ['', Validators.required],
      IFSC_Code: ['', Validators.required],
      AccountType: ['', Validators.required],
    }, {
        validator: MustMatch('AccountNo', 'ReAccountNo')
      });

    this.getBanks(this.user.InstituteId);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  public user=Utils.GetCurrentUser();

  onSubmit() {
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
        InstituteId:this.user.InstituteId

      };
      this.BankService.bank(body).subscribe((data) => {
        this.modalRef.hide();
        this.getBanks(this.user.InstituteId);
        this.submitted = false;

      })
    }
  }

  addBankAccNo(Addtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(Addtemplate, {
      animated: true,
      backdrop: 'static'
    });


  }

  getBanks(InstituteId:number) {
InstituteId=this.user.InstituteId;
    this.BankService.bankList(InstituteId).subscribe(res => {
      this.banks = res;
      this.dtTrigger.next();
    });
  }

  delete(ID,BankName) {
    var ans = confirm("Do you want to delete this Bank : " + BankName);
    if (ans) {
      this.BankService.delete(ID).subscribe(data => {
        this.getBanks(this.user.InstituteId);
      }, error => console.error(error))
    }
  }

  editAccNo(editTemplate: TemplateRef<any>, bank) {
    let selectedBank = {
      ID: bank.ID,
      BankName: bank.BankName,
      AccountNo:bank.AccountNo,
      AccountType: bank.AccountType,
      IFSC_Code: bank.IFSC_Code,   
    }
    this.registerForm.patchValue(selectedBank);
    this.registerForm.controls.ReAccountNo.setValue(bank.AccountNo);
    this.registerForm.controls.AccountNo.setValue(bank.AccountNo);
    this.modalRef = this.modalService.show(editTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }

  updateAccNo() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.f)
    let body = {
      AccountNo: this.registerForm.controls.AccountNo.value,
      ID: this.registerForm.controls.ID.value,
      BankName: this.registerForm.controls.BankName.value,
      AccountType: this.registerForm.controls.AccountType.value,
      IFSC_Code: this.registerForm.controls.IFSC_Code.value,
      InstituteId:this.user.InstituteId
    }
    this.BankService.editAccNo(body).subscribe(data => {
      this.modalRef.hide();
      this.getBanks(this.user.InstituteId);
    }, error => console.error(error))
  }
  clearForm() {
    this.registerForm.reset()
      
  }
}




