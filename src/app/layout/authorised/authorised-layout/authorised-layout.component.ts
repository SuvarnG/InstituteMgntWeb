import { FeesTransaction } from './../../../Model/Students';
import { FeesTransactionService } from './../../../fees-transaction/fees-transaction.service';
import { Expenses, ExpenseChart, IncomeExpense } from './../../../Model/Expenses';
import { Utils } from './../../../Utils';
import { ExpenseService } from './../../../ExpenseTransaction/expense.service';
import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-authorised-layout',
  templateUrl: './authorised-layout.component.html',
  styleUrls: ['./authorised-layout.component.css']
})
export class AuthorisedLayoutComponent implements OnInit {
  public expenses: Expenses[];
  CurrentMonthCourses = [];
  CurrentMonthIncome = [];
  ExpensesInMonth = [];
  MonthwiseExpenseAmt = [];
  CurrentMonthExpenses = [];
  CurrentMonthExpenseAmt = []
  IncomeInMonths = [];
  TotalIncome = [];
  modalRef: BsModalRef;
  chart = [];
  TotalStudents = [];
  Income = [];
  Expenses = [];
  chart1 = [];
  Month = [];
  month_Name: any;

  constructor(private expenseService: ExpenseService,
    private feesTransactionService: FeesTransactionService,
    private modalService: BsModalService, ) { }

  ngOnInit() {

    this.month_Name = new Date();
    this.feesTransactionService.getCurrentMonthCoursewiseIncome(this.user.BranchId).subscribe((result: FeesTransaction[]) => {
      result.forEach(x => {
        this.CurrentMonthCourses.push(x.Course);
        this.CurrentMonthIncome.push(x.Income);
      });
      this
      this.chart = new Chart('canvas', {
        type: 'pie',
        innerRadius: 90,
        data: {
          labels: this.CurrentMonthCourses,
          innerRadius: 90,
          datasets: [
            {
              data: this.CurrentMonthIncome,
              backgroundColor: [
                "#20a8d8",
                "#f86c6b",
                "#ffc107",
                "#4dbd74",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",

              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
    });


    this.expenseService.currentMonthExpensesChartList(this.user.BranchId).subscribe((result: ExpenseChart[]) => {
      result.forEach(x => {
        this.CurrentMonthExpenses.push(x.ExpenseName);
        this.CurrentMonthExpenseAmt.push(x.PaidAmount);
      });
      this
      this.chart = new Chart('canvas2', {
        type: 'pie',
        innerRadius: 90,
        data: {
          labels: this.CurrentMonthExpenses,
          innerRadius: 90,
          datasets: [
            {
              data: this.CurrentMonthExpenseAmt,
              label: 'Expenses',
              backgroundColor: [
                "#20a8d8",
                "#f86c6b",
                "#ffc107",
                "#4dbd74",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",

              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
    });


    this.expenseService.monthwiseExpensesChartList(this.user.BranchId).subscribe((result: ExpenseChart[]) => {
      result.forEach(x => {
        this.ExpensesInMonth.push(x.Month);
        this.MonthwiseExpenseAmt.push(x.PaidAmount);
      });
      this
      this.chart = new Chart('canvas3', {
        type: 'bar',
        data: {
          labels: this.ExpensesInMonth,
          datasets: [
            {
              backgroundColor: "#ffc107",
              label: 'Expenses',
              data: this.MonthwiseExpenseAmt,
              borderColor: '#3cba9f',
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });


    this.feesTransactionService.getMonthwiseIncome(this.user.BranchId).subscribe((result: FeesTransaction[]) => {
      result.forEach(x => {
        this.IncomeInMonths.push(x.Month);
        this.TotalIncome.push(x.Income);
      });
      this
      this.chart = new Chart('canvas1', {
        type: 'bar',
        data: {
          labels: this.IncomeInMonths,
          datasets: [
            {
              backgroundColor: "#20a8d8",
              label: 'Income',
              data: this.TotalIncome,
              borderColor: '#3cba9f',
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });

    this.expenseService.getIncomeAndExpenseData(this.user.BranchId).subscribe((result: IncomeExpense[]) => {
      result.forEach(x => {
        this.Month.push(x.Month);
        this.TotalStudents.push(x.TotalStudents);
        this.Income.push(x.Income);
        this.Expenses.push(x.Expense);
      });
      this
      this.chart1 = new Chart('canvasmodal', {
        type: 'bar',
        data: {
          labels: this.Month,
          datasets: [
            {
              data: [this.TotalStudents],
              borderColor: '#3cba9f',
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "Blue",
                "Red",
                "Blue"
              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  showGraph(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      animated: true,
      backdrop: 'static'
    });
  }


  public user = Utils.GetCurrentUser();
}

