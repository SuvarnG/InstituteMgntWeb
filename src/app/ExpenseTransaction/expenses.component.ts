import { Component, OnInit, TemplateRef, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseService } from './expense.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Expenses } from '../Model/Expenses';
import { User } from '../Model/User';
import { StaffMaster } from '../Model/StaffMaster';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
@Pipe({
  name: 'dateFormat'
})
export class ExpensesComponent implements OnInit {
  expenseForm: FormGroup;
  id: number;
  expenseId: number;
  errorMessage: any;
  modalRef: BsModalRef;
  returnUrl: string;
  editExpenseForm: FormGroup;
  public listUser: User[];
  public expenses: Expenses[];
  public staffMasters: StaffMaster[];
  selectedUserValue: Number;
  submitted = false;

  constructor(private modalService: BsModalService, private router: Router,
    private ExpenseService: ExpenseService,
    private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      ExpenseType: ['', [Validators.required]],
      AmountPaid: ['', [Validators.required]],
      Date: [new Date().toDateString(), [Validators.required]],
      PaidByWhom: ['', [Validators.required]],
      Remark: ['', [Validators.required]],
      ExpenseId:[],
      PaidByName:[]
    })

    this.editExpenseForm = this.fb.group({
      ExpenseType: ['', [Validators.required]],
      AmountPaid: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      PaidByWhom: ['', [Validators.required]],
      Remark: ['', [Validators.required]],
      ExpenseId:[],
      //Expenses: ['', [Validators.required]],
      Id:[],
      PaidByName:[]
    })
    this.getAllExpenseTransction();
    this.ExpenseService.getAllExpenseType();
    this.getStaffList();
    //this.ExpenseService.userList();
  }

  getAllExpenseTransction() {
    this.ExpenseService.expensesList().subscribe(res => this.expenses = res);
  }

  addNewExpense(addExpense: TemplateRef<any>) {
    //this.ExpenseService.userList();
    this.ExpenseService.getAllExpenseType();
    this.modalRef = this.modalService.show(addExpense, {
      animated: true,
      backdrop: 'static'
    });
  }

  delete(expenseID) {
    var ans = confirm("Do you want to delete customer with Id: " + expenseID);
    if (ans) {
      this.ExpenseService.deleteExpense(expenseID).subscribe(data => {
        this.getAllExpenseTransction();
      }, error => console.error(error))
    }
  }

  onSubmit() {
    if (this.expenseForm.invalid == true) {
      this.submitted = true;
      return;
    }
    else {
      this.submitted = false;
      let body = {
        ExpenseType: this.expenseForm.controls.ExpenseType.value,
        Paid: this.expenseForm.controls.AmountPaid.value,
       // PaidByWhom: this.selectedUserValue,
       PaidByWhom: this.expenseForm.controls.PaidByWhom.value,
       PaidByName:this.expenseForm.controls.PaidByName.value,
        Date: this.expenseForm.controls.Date.value,
        Remark: this.expenseForm.controls.Remark.value
      }
      this.ExpenseService.saveExpense(body)
        .subscribe((data) => {
          this.modalRef.hide();
          this.getAllExpenseTransction();
        }, error => this.errorMessage = error)
    }
  }

  edit(editExpense: TemplateRef<any>, e) {
    debugger;
   
    this.id = e.Id;
    this.expenseId = e.ExpenseId;
    
    
      let selectedexpense={
      ExpenseType: e.ExpenseType,
      AmountPaid: e.Paid,
      PaidByWhom: e.PaidByWhom,
      Date: new Date(e.Date).toDateString(),
      Remark: e.Remark,
      Id: e.Id,
      ExpenseId: e.ExpenseId,
      PaidByName:e.PaidByName
      }
      this.editExpenseForm.patchValue(selectedexpense);
     
   
    this.modalRef = this.modalService.show(editExpense, {
      animated: true,
      backdrop: 'static'
    });
   
    
  }

  onSubmitEdit() {
    debugger;
    if (this.editExpenseForm.invalid == true) {
      this.submitted = true;
      return;
    }
    else {
      this.submitted = false;
      let body = {
        ExpenseType: this.editExpenseForm.controls.ExpenseType.value,
        Paid: this.editExpenseForm.controls.AmountPaid.value,
       // PaidByWhom: this.selectedUserValue,
        PaidByWhom: this.editExpenseForm.controls.PaidByWhom.value,
        PaidByName:this.editExpenseForm.controls.PaidByName.value,
        Date: this.editExpenseForm.controls.Date.value,
        Remark: this.editExpenseForm.controls.Remark.value,
        Id: this.editExpenseForm.controls.Id.value,
        ExpenseId: this.editExpenseForm.controls.ExpenseId.value,
       // Expenses: this.editExpenseForm.controls.Expenses.value,
      }
       this.ExpenseService.updateExpense(body)
        .subscribe((data) => {
          this.modalRef.hide();
          this.getAllExpenseTransction();
        }, error => this.errorMessage = error)
    }
  }

  get f() {
    return this.expenseForm.controls;
  }
  get form() {
    return this.editExpenseForm.controls;
  }

  selectUser(event) {
    debugger;
    this.selectedUserValue = event.target.value;
  }


  getStaffList() {
    this.ExpenseService.GetStaffList().subscribe(res => { this.staffMasters = res; console.log("test", this.staffMasters) });
  }
}
