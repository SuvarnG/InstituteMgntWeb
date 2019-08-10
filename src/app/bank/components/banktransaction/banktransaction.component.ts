import { StaffListService } from '../../../Staff/Services/staff-list.service';
import { Bank } from 'shared/Model/Bank';
import { BankService } from '../../services/bank.service';
import { Utils } from '../../../Core/Utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffMaster } from 'shared/Model/StaffMaster';
import { Accountnumbers } from 'shared/Model/AccountNumber';
import { BankTransaction } from 'shared/Model/BankTransaction';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-banktransaction',
  templateUrl: './banktransaction.component.html',
  styleUrls: ['./banktransaction.component.css']
})
export class BanktransactionComponent implements OnDestroy, OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bankService: BankService,
    private staffListService: StaffListService) { }

  modalRef: BsModalRef;
  CreateFormGroup: FormGroup;
  UpdateFormGroup: FormGroup;
  submitted = false;
  returnUrl: string;
  public banktransactions = [];
  public staffMasters: StaffMaster[];
  bankName: string;
  public banknames: Bank[];
  public listaccno: BankTransaction[];
  public accountnumbers: Accountnumbers[];
  public bankTransactionId: number;
  TransactionBy: number
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  filter: any;

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

  addBank(Addtemplate: TemplateRef<any>) {
    this.getBankTransaction(this.user.BranchId);
    this.CreateFormGroup.controls.ID.reset,
      this.CreateFormGroup.controls.BankName.reset,
      this.CreateFormGroup.controls.AccountNo.reset,
      this.CreateFormGroup.controls.TransactionType.reset,
      this.CreateFormGroup.controls.Amount.reset,

      this.modalRef = this.modalService.show(Addtemplate, {
        animated: true,
        backdrop: 'static',
        class: 'modal-md'

      });
  }

  ngOnInit() {
    this.dtOptions = {
      retrieve: true,
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 7,
      searching: false
    };

    this.CreateFormGroup = this.formBuilder.group({
      ID: [],
      BankName: ['', Validators.required],
      AccountNo: ['', Validators.required],
      TransactionType: ['', Validators.required],
      Amount: ['', Validators.required],
    })
    this.getBankTransaction(this.user.BranchId);
    this.getBankList();
    this.getStaffList();

    this.UpdateFormGroup = this.formBuilder.group({
      ID: [],
      BankName: ['', Validators.required],
      AccountNo: ['', Validators.required],
      TransactionType: ['', Validators.required],
      Amount: ['', Validators.required],
      TransactionById: [],
      Date: [new Date().toString(), Validators.required]
    })

  }

  getStaffList() {
    this.staffListService.getAllStaff(this.user.InstituteId, this.user.BranchId).subscribe(res => { this.staffMasters = res;});
  }

  getBankList() {
    this.bankService.getbankAccountsList(this.user.InstituteId).subscribe(res => {
      this.banknames = res;
     
    });
  }

  get f() { return this.CreateFormGroup.controls; }
  get fu() { return this.UpdateFormGroup.controls; }

  public user = Utils.GetCurrentUser();

  createBankTransaction() {
    this.submitted = true;
    if (this.CreateFormGroup.invalid) {
      return;
    }
    else {
      this.submitted = false;
      let body = {
        ID: 0,
        BankName: this.CreateFormGroup.controls.BankName.value,
        AccountNo: this.CreateFormGroup.controls.AccountNo.value,
        TransactionType: this.CreateFormGroup.controls.TransactionType.value,
        Date: new Date(),
        Amount: this.CreateFormGroup.controls.Amount.value,
        TransactionBy: this.user.userId,
        BranchId: this.user.BranchId
      };

      this.bankService.createBankTransaction(body).subscribe((data) => {
        this.modalRef.hide();
        this.getBankTransaction(this.user.BranchId);
        this.rerender();
        this.submitted = false;

      })
    }
  }

  getBankTransaction(BranchId: number) {
    BranchId = this.user.BranchId;
    this.bankService.getBankTransactionList(BranchId).subscribe(res => {
      this.banktransactions = res;
      this.rerender();
    });
  }

  getAccountNumber(event: any) {
    this.bankService.getAccountNumber(event.target.value).subscribe(res => { this.listaccno = res; });
  }

  openEditModal(editTemplate: TemplateRef<any>, banktransaction) {
    this.TransactionBy = banktransaction.TransactionById;
    this.bankTransactionId = banktransaction.ID;
    let selectedBank = {
      ID: banktransaction.ID,
      BankName: banktransaction.BankName,
      AccountNo: banktransaction.AccountNo,
      TransactionType: banktransaction.TransactionType,
      Amount: banktransaction.Amount,
      Date: new Date(banktransaction.Date).toDateString(),
    }
    this.UpdateFormGroup.patchValue(selectedBank);
    this.modalRef = this.modalService.show(editTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }

  updateBankTransaction() {
    this.submitted = true;
    if (this.UpdateFormGroup.invalid) {
      return;
    }

    this.submitted = false;
    let body = {
      ID: this.bankTransactionId,
      BankName: this.UpdateFormGroup.controls.BankName.value,
      AccountNo: this.UpdateFormGroup.controls.AccountNo.value,
      TransactionType: this.UpdateFormGroup.controls.TransactionType.value,
      Amount: this.UpdateFormGroup.controls.Amount.value,
      TransactionBy: this.user.userId,
      Date: new Date(),
      BranchId: this.user.BranchId
    }
    this.bankService.updateBankTransaction(body).subscribe(data => {
      this.modalRef.hide();
      this.getBankTransaction(this.user.BranchId);
      this.rerender();
    }, error => console.error(error))
  }

  clearForm() {
    this.CreateFormGroup.reset()
  }

}


