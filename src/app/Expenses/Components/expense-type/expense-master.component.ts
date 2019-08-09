import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExpenseMasterService } from '../../Services/expense-master.service';
import { ExpenseMaster } from 'shared/Model/Expenses';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-expense-master',
  templateUrl: './expense-master.component.html',
  styleUrls: ['./expense-master.component.css']
})
export class ExpenseMasterComponent implements OnInit {
  expenseType: ExpenseMaster[];
  modalRef: BsModalRef;
  createExpenseForm: FormGroup;
  editExpenseForm: FormGroup;
  errorMessage: string;
  expensId: Number;
  submitted = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  filter: any;
  chkExpenseType:any;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private fb: FormBuilder,
    private expenseMasterService: ExpenseMasterService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: false
    };

    this.createExpenseForm = this.fb.group({
      expense: ['', [Validators.required]],
    }),

      this.editExpenseForm = this.fb.group({
        expense: ['', [Validators.required]],
      }),

      this.getAllExpense();
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

  get f() { return this.createExpenseForm.controls }

  get g() { return this.editExpenseForm.controls }

  getAllExpense() {
    this.expenseMasterService.getAllExpenses().subscribe(res => {
      this.expenseType = res;
      this.rerender();
    });
  }

  showCreateExpenseTemplate(CreateExpenseTemplate: TemplateRef<any>) {
    this.submitted = false;
    this.createExpenseForm.controls.expense.reset();
    this.modalRef = this.modalService.show(CreateExpenseTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }

  onSubmitCreateExpense(expenses) {
    debugger;
    this.submitted = true;
    if (this.createExpenseForm.invalid) {
      return;
    }
    for (var i = 0; i <expenses.length; i++) {
      if (this.createExpenseForm.controls.expense.value == expenses[i].Expenses) {
        alert("Duplicate Expense Type Not Allowed.");
        return;
      }
    }
    debugger;
    let body = {
      Expenses: this.createExpenseForm.controls.expense.value
    }
    this.expenseMasterService.createNewExpense(body)
      .subscribe((data) => {
        this.modalRef.hide();
        this.getAllExpense();
        this.rerender();
      }, error => this.errorMessage = error)

  }

  // deleteExpense(expenseName: any, id: number) {
  //   var ans = confirm("Do you want to delete the expense: " + expenseName);
  //   if (ans) {
  //     this.expenseMasterService.deleteExpense(id).subscribe(data => {
  //       this.getAllExpense();
  //     }, error => console.error(error))
  //   }
  // }


   deleteExpense(expenseName: any, id: number) {
    if(confirm("Do you want to delete the expense: " + expenseName))
    {
      this.expenseMasterService.deleteExpense(id).subscribe(data => {
        this.chkExpenseType=data;
        if(this.chkExpenseType>0){
          alert('Sorry, You can not delete this expense as it has active expense records')
          return;
        }
        this.getAllExpense();
      }, error => console.error(error))
    }
  }

  editExpense(EditExpenseTemplate: TemplateRef<any>, expense) {
    this.expensId = expense.ExpenseId;
    let body = {
      expense: expense.Expenses
    }
    this.editExpenseForm.patchValue(body);
    this.modalRef = this.modalService.show(EditExpenseTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }

  onSubmitEditExpense() {
    this.submitted = true;
    if (this.editExpenseForm.invalid) {
      //this.submitted=false;
      return;
    }
    let body = {
      Expenses: this.editExpenseForm.controls.expense.value,
      ExpenseId: this.expensId
    }
    this.expenseMasterService.editExpense(body)
      .subscribe((data) => {
        this.modalRef.hide();
        this.getAllExpense();
        this.rerender();
      }, error => this.errorMessage = error)
  }
}
