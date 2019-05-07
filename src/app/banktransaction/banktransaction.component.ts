import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanktransactionService } from './banktransaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffMaster } from '../Model/StaffMaster';

@Component({
  selector: 'app-banktransaction',
  templateUrl: './banktransaction.component.html',
  styleUrls: ['./banktransaction.component.css']
})
export class BanktransactionComponent {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public banktransactions = [];
  public staffMasters: StaffMaster[];
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private router: Router,
    private BanktransactionService: BanktransactionService,
    private route: ActivatedRoute) { }

  openModal(template: TemplateRef<any>) {

   // this.BanktransactionService.TransactionByWhom();
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });

  }

  openModal1(template1: TemplateRef<any>) {

    //  this.BanktransactionService.TransactionByWhom().subscribe(res=>this.staffMaster=res);
    this.modalRef = this.modalService.show(template1, {
      animated: true,
      backdrop: 'static'
    });

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      BankName: ['', Validators.required],
      AccountNo: ['', Validators.required],
      // TransactionType: ['', Validators.required],
      Amount: ['', Validators.required],
      // ByWhom: ['', Validators.required],
      Date: ['', Validators.required]
    });
    this.getBankTransaction();
    this.getStaffList();
  }
  getStaffList() {
    this.BanktransactionService.GetStaffList().subscribe(res =>{ this.staffMasters = res;console.log(this.staffMasters)});
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  getBankTransaction() {

    this.BanktransactionService.banktransactionList().subscribe(res => this.banktransactions = res);
    console.log(JSON.stringify(this.banktransactions));
  }

  Submit() {

    let body = {

      BankName: this.registerForm.controls.BankName.value,
      AccountNumber: this.registerForm.controls.AccountNo.value,
      TransactionType: this.registerForm.controls.TransactionType.value,
      Date: this.registerForm.controls.Date.value,
      Amount: this.registerForm.controls.Amount.value,
      FirstName: this.registerForm.controls.FirstName.value,
      MiddleName: this.registerForm.controls.MiddleName.value,
      LastName: this.registerForm.controls.LastName.value,
      ByWhom: ''
      // IsActive :this.registerForm.controls.IsActive.value
    };

    this.BanktransactionService.banktransaction(body).subscribe((data) => {
      this.router.navigate(['/BankTransaction']);
    })
  }
}

