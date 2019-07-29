import { ExpenseMaster } from './../Model/Expenses';
import { ExpenseMasterService } from './../expense-master/expense-master.service';
import { StaffListService } from './../staff/staff-list.service';
import { Component, OnInit, TemplateRef, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseService } from './expense.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Expenses } from '../Model/Expenses';
import { User } from '../Model/User';
import { StaffMaster } from '../Model/StaffMaster';
import { Subject } from 'rxjs';
import { Utils } from '../Utils';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
@Pipe({
  name: 'dateFormat'
})
export class ExpensesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  expenseForm: FormGroup;
  id: number;
  expenseId: number;
  errorMessage: any;
  modalRef: BsModalRef;
  returnUrl: string;
  editExpenseForm: FormGroup;
  public listUser: User[];
  public expenses: Expenses[];
  listExpenseType:ExpenseMaster[];
  public staffMasters: StaffMaster[];
  selectedUserValue: Number;
  submitted = false;
  expenseMaster:ExpenseMaster[];
  filter:any;
  p:any;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private ExpenseService: ExpenseService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private staffListService:StaffListService,
    private expenseMasterService:ExpenseMasterService) { }

  ngOnInit() {

     this.dtOptions = {
       //retrieve: true,
       pagingType: 'full_numbers',
       pageLength: 10,
       paging:false,
       searching:false

     };
    this.expenseForm = this.fb.group({
      ExpenseType: ['', [Validators.required]],
      AmountPaid: ['', [Validators.required]],
      Date: [],
      PaidByWhom: [],
      Remark: ['', [Validators.required]],
      ExpenseId:[],
      PaidByName:[]
    })

    this.editExpenseForm = this.fb.group({
      ExpenseType: ['', [Validators.required]],
      AmountPaid: ['', [Validators.required]],
      Date: [],
      PaidByWhom: [],
      Remark: ['', [Validators.required]],
      ExpenseId:[],
      Id:[],
      PaidByName:[]
    })
    this.getAllExpenseTransction(this.user.BranchId);
    this.expenseMasterService.getAllExpenses().subscribe(res=>
      {
        this.expenseMaster=res
      });
    this.getStaffList();
  }

  public user=Utils.GetCurrentUser();
  
  getAllExpenseTransction(BranchId:number) {
    BranchId=this.user.BranchId;
    this.ExpenseService.expensesList(BranchId).subscribe(res =>
      { this.expenses = res;
    this.dtTrigger.next();
  });
}

  addNewExpense(addExpense: TemplateRef<any>) {
    this.expenseForm.reset();
    this.expenseMasterService.getAllExpenses().subscribe(res=>
      {
        this.expenseMaster=res
      });;
    this.modalRef = this.modalService.show(addExpense, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }

  delete(expensetype:string,expenseID:number) {
    var ans = confirm("Do you want to delete expense od type: " + expensetype);
    if (ans) {
      this.ExpenseService.deleteExpense(expenseID).subscribe(data => {
        this.getAllExpenseTransction(this.user.BranchId);
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
       PaidByWhom: this.user.userId,
       PaidByName:this.expenseForm.controls.PaidByName.value,
        Date: new Date(),
        Remark: this.expenseForm.controls.Remark.value,
        BranchId:this.user.BranchId
      }
      this.ExpenseService.saveExpense(body)
        .subscribe((data) => {
          this.modalRef.hide();
          this.getAllExpenseTransction(this.user.BranchId);
        }, error => this.errorMessage = error)
    }
  }

  getExpenseList(){
    this.expenseMasterService.getAllExpenses().subscribe(data=>{this.listExpenseType=data})
  }

  edit(editExpense: TemplateRef<any>, e) {
   this.modalRef = this.modalService.show(editExpense, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });

    this.getExpenseList();
    this.editExpenseForm.patchValue({
      ExpenseType: e.ExpenseId,
      AmountPaid: e.Paid,
      PaidByWhom: e.PaidByWhom,
      Date: new Date(e.Date).toDateString(),
      Remark: e.Remark,
      Id: e.Id,
      ExpenseId:e.ExpenseId,
      PaidByName:e.PaidByName
    })  
    
  }

  onSubmitEdit() {
    if (this.editExpenseForm.invalid == true) {
      this.submitted = true;
      return;
    }
    else {
      this.submitted = false;
      let body = {
        ExpenseType: this.editExpenseForm.controls.ExpenseType.value,
        Paid: this.editExpenseForm.controls.AmountPaid.value,
        PaidByWhom: this.user.userId,
        PaidByName:this.editExpenseForm.controls.PaidByName.value,
        Date: new Date(),
        Remark: this.editExpenseForm.controls.Remark.value,
        Id: this.editExpenseForm.controls.Id.value,
       BranchId:this.user.BranchId
      }
       this.ExpenseService.updateExpense(body)
        .subscribe((data) => {
          this.modalRef.hide();
          this.getAllExpenseTransction(this.user.BranchId);
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
    this.selectedUserValue = event.target.value;
  }

  getStaffList() {
    this.staffListService.getAllStaff(this.user.InstituteId,this.user.BranchId).subscribe(res => { this.staffMasters = res; console.log("test", this.staffMasters) });
  }
}
