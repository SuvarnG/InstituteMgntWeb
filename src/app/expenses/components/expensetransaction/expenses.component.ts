import { ExpenseMaster } from 'shared/Model/Expenses';
import { Component, OnInit, TemplateRef, Pipe, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseService } from '../../Services/expense.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expenses } from 'shared/Model/Expenses';
import { User } from 'shared/Model/User';
import { StaffMaster } from 'shared/Model/StaffMaster';
import { Subject } from 'rxjs';
import { Utils } from '../../../Core/Utils';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
@Pipe({
  name: 'dateFormat'
})
export class ExpensesComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private modalService: BsModalService,
    private expenseService: ExpenseService,
    private fb: FormBuilder
  ) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  expenseForm: FormGroup;
  public listUser: User[];
  public expenses: Expenses[];
  public staffMasters: StaffMaster[];
  id: number;
  expenseId: number;
  errorMessage: any;
  modalRef: BsModalRef;
  returnUrl: string;
  editExpenseForm: FormGroup;
  listExpenseType: ExpenseMaster[];
  selectedUserValue: Number;
  submitted = false;
  expenseMaster: ExpenseMaster[];
  filter: any;
  p: any;

  ngOnInit() {

    this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: false

    };

    this.expenseForm = this.fb.group({
      ExpenseType: ['', [Validators.required]],
      AmountPaid: ['', [Validators.required]],
      Date: [],
      PaidByWhom: [],
      Remark: ['', [Validators.required]],
      ExpenseId: [],
      PaidByName: []
    })

    this.editExpenseForm = this.fb.group({
      ExpenseType: ['', [Validators.required]],
      AmountPaid: ['', [Validators.required]],
      Date: [],
      PaidByWhom: [],
      Remark: ['', [Validators.required]],
      ExpenseId: [],
      Id: [],
      PaidByName: []
    })
    this.getAllExpenseTransction(this.user.BranchId);
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

  public user = Utils.GetCurrentUser();

  getAllExpenseTransction(BranchId: number) {
    BranchId = this.user.BranchId;
    this.expenseService.expensesList(BranchId).subscribe(res => {
      this.expenses = res;
      this.rerender();
    });
  }

  addNewExpense(addExpense: TemplateRef<any>) {
    this.expenseForm.reset();
    this.expenseService.getAllExpenseType().subscribe(res => {
      this.expenseMaster = res
    });;
    this.modalRef = this.modalService.show(addExpense, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }

  delete(expensetype: string, expenseID: number) {
    var ans = confirm("Do you want to delete expense od type: " + expensetype);
    if (ans) {
      this.expenseService.deleteExpense(expenseID).subscribe(() => {
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
        PaidByName: this.expenseForm.controls.PaidByName.value,
        Date: new Date(),
        Remark: this.expenseForm.controls.Remark.value,
        BranchId: this.user.BranchId
      }
      this.expenseService.createExpense(body)
        .subscribe(() => {
          this.modalRef.hide();
          this.getAllExpenseTransction(this.user.BranchId);
          this.rerender();
        }, error => this.errorMessage = error)
    }
  }

  getExpenseList() {
    this.expenseService.getAllExpenseType().subscribe(data => { this.listExpenseType = data })
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
      ExpenseId: e.ExpenseId,
      PaidByName: e.PaidByName
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
        PaidByName: this.editExpenseForm.controls.PaidByName.value,
        Date: new Date(),
        Remark: this.editExpenseForm.controls.Remark.value,
        Id: this.editExpenseForm.controls.Id.value,
        BranchId: this.user.BranchId
      }
      this.expenseService.editExpense(body)
        .subscribe(() => {
          this.modalRef.hide();
          this.getAllExpenseTransction(this.user.BranchId);
          this.rerender();
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

}
