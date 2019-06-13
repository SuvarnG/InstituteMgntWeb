import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanktransactionService } from './banktransaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffMaster } from '../Model/StaffMaster';
import { map } from 'rxjs/operators';
import { BankNames } from '../Model/BankNames';
import { Accountnumbers } from '../Model/AccountNumber';
import { BankTransaction } from '../Model/BankTransaction';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-banktransaction',
  templateUrl: './banktransaction.component.html',
  styleUrls: ['./banktransaction.component.css']
})
export class BanktransactionComponent implements OnDestroy, OnInit {
  modalRef: BsModalRef;
  CreateFormGroup: FormGroup;
  UpdateFormGroup: FormGroup;
  submitted = false;
  returnUrl: string;
  public banktransactions = [];
  public staffMasters: StaffMaster[];
  bankName: string;
  public banknames: BankNames[];
  public listaccno: BankTransaction[];
  public accountnumbers: Accountnumbers[];
  public bankTransactionId: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

 constructor(private http: HttpClient, private modalService: BsModalService, private formBuilder: FormBuilder, private router: Router,
    private BanktransactionService: BanktransactionService,
    private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  AddBank(Addtemplate: TemplateRef<any>) {
    debugger;
    this.getBankTransaction();
     this.CreateFormGroup.controls.ID.reset,
      this.CreateFormGroup.controls.BankName.reset,
      this.CreateFormGroup.controls.AccountNo.reset,
      this.CreateFormGroup.controls.TransactionType.reset,
      this.CreateFormGroup.controls.Date.reset,
      this.CreateFormGroup.controls.Amount.reset,
      this.CreateFormGroup.controls.TransactionBy.reset

    //this.getBankList();
    this.modalRef = this.modalService.show(Addtemplate, {
      animated: true,
      backdrop: 'static'
    });

  }

ngOnInit() {
    this.dtOptions = {
      retrieve: true,
      paging: false,
      pagingType: 'full_numbers',
      pageLength: 5

    };

  this.CreateFormGroup = this.formBuilder.group({
      ID: [],
      BankName: ['', Validators.required],
      AccountNo: ['', Validators.required],
      TransactionType: ['', Validators.required],
      Amount: ['', Validators.required],

      TransactionBy: ['', Validators.required],
      Date: ['', Validators.required]
    })
    this.getBankTransaction();
    this.getBankList();
     this.getStaffList();
    


    this.UpdateFormGroup = this.formBuilder.group({
      ID: [],
      BankName: ['', Validators.required],
      AccountNo: ['', Validators.required],
      TransactionType: ['', Validators.required],
      Amount: ['', Validators.required],
      TransactionBy: ['', Validators.required],
      TransactionById:[],
      Date: [new Date().toString(), Validators.required]
    })
    
 }


  getStaffList() {
    this.BanktransactionService.GetStaffList().subscribe(res => { this.staffMasters = res; console.log("test", this.staffMasters) });
  }

  getBankList() {
    
    this.BanktransactionService.GetBankList().subscribe(res => { this.banknames = res; console.log("test", this.banknames) });
  }


  get f() { return this.CreateFormGroup.controls; }
  get fu() { return this.UpdateFormGroup.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.CreateFormGroup.invalid) {
      return;
    }
    else {
      let body = {
        ID: 0,
        BankName: this.CreateFormGroup.controls.BankName.value,
        AccountNo: this.CreateFormGroup.controls.AccountNo.value,
        TransactionType: this.CreateFormGroup.controls.TransactionType.value,
        Date: this.CreateFormGroup.controls.Date.value,
        Amount: this.CreateFormGroup.controls.Amount.value,
        TransactionBy: this.CreateFormGroup.controls.TransactionBy.value,
      };

      this.BanktransactionService.banktransaction(body).subscribe((data) => {
        this.modalRef.hide();
        this.getBankTransaction();
        this.submitted = false;

      })
    }
  }


  getBankTransaction() {
    debugger;
    this.BanktransactionService.banktransactionList().subscribe(res => {
      this.banktransactions = res;
      this.dtTrigger.next();
    });
    //console.log(JSON.stringify(this.banktransactions));
  }


  getAccountNumber(event: any) {
    debugger;

    this.BanktransactionService.GetAccountNumber(event.target.value).subscribe(res => { this.listaccno = res; console.log("test", this.listaccno) });

  }

  Edit(editTemplate: TemplateRef<any>, banktransaction) {
    debugger;
    this.bankTransactionId = banktransaction.ID;
    let selectedBank = {
      ID: banktransaction.ID,
      BankName: banktransaction.BankName,
      AccountNo: banktransaction.AccountNo,
      TransactionType: banktransaction.TransactionType,
      Amount:banktransaction.Amount,
      TransactionBy:banktransaction.TransactionBy,
      TransactionById:banktransaction.TransactionById,
      Date:new Date(banktransaction.Date).toDateString(),
    }
    this.UpdateFormGroup.patchValue(selectedBank);
    this.modalRef = this.modalService.show(editTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }

  Update() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.UpdateFormGroup.invalid) {
      return;
    }
    debugger;
    console.log(this.fu)
    let body = {
      ID: this.bankTransactionId,
      BankName: this.UpdateFormGroup.controls.BankName.value,
      AccountNo: this.UpdateFormGroup.controls.AccountNo.value,
      TransactionType: this.UpdateFormGroup.controls.TransactionType.value,
      Amount: this.UpdateFormGroup.controls.Amount.value,
      TransactionBy: this.UpdateFormGroup.controls.TransactionBy.value,
      Date: this.UpdateFormGroup.controls.Date.value,
    }
    this.BanktransactionService.Edit(body).subscribe(data => {
      this.modalRef.hide();
      this.getBankTransaction();
    }, error => console.error(error))
  }
  clearForm()
  {
    this.CreateFormGroup.reset()
  }
}


