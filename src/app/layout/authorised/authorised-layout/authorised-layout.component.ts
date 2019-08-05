import { FeesTransaction } from './../../../Model/Students';
import { FeesTransactionService } from './../../../fees-transaction/fees-transaction.service';
import { Expenses, ExpenseChart, IncomeExpense } from './../../../Model/Expenses';
import { Utils } from './../../../Utils';
import { ExpenseService } from './../../../ExpenseTransaction/expense.service';
import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Branch } from 'src/app/Model/Branch';
import { BranchService } from 'src/app/branch/branch.service';
import { map } from 'rxjs/operators';

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
  CurrentMonthExpenseAmt = [];
  IncomeInMonths = [];
  TotalIncome = [];
  modalRef: BsModalRef;
  chart:any;
  chart2:any;
  chart3:any;
  chart4:any;
  TotalStudents:any = [];
  Income:any = [];
  Expenses:any = [];
  chart1:any = [];
  Month:any = [];
  month_Name: any;
  branchList:Branch[];
  branchSelection:number;
  currentRole:string;
  branchId:number;
  firstBranchId:number;


  constructor(private expenseService: ExpenseService,
    private feesTransactionService: FeesTransactionService,
    private modalService: BsModalService,
    private branchService: BranchService ) { }

  ngOnInit() {

    
    //this.getBranchList();
    this.getUserRole();
    
    if(this.currentRole=='Admin'){

      this.branchService.getBranches(this.user.InstituteId).toPromise().then(data=>{
        this.branchList = data;

        if(this.branchList[0]['BranchId']){
          this.firstBranchId = Number(this.branchList[0]['BranchId']) ;
          this.branchId=this.firstBranchId;
          this.getMonthwiseIncome();
          this.getCurrentMonthCoursewiseIncome();
          this.currentMonthExpensesChartList();
          this.monthwiseExpensesChartList();
        }
       
      })      
      
    }
    else{
      this.getBranchList();
      this.branchId=this.user.BranchId;
      this.getMonthwiseIncome();
      this.getCurrentMonthCoursewiseIncome();
      this.currentMonthExpensesChartList();
      this.monthwiseExpensesChartList();
    }
   
  }

  




  getMonthwiseIncome(){
    this.IncomeInMonths=[];
    this.TotalIncome=[];
    //this.chart2=[];

     if(this.chart2) {
		 	this.chart2.destroy();
		 }

  this.feesTransactionService.getMonthwiseIncome(this.branchId).subscribe((result: FeesTransaction[]) => {
    result.forEach(x => {
      this.IncomeInMonths.push(x.Month);
      this.TotalIncome.push(x.Income);
    });
    this
    this.chart2 = new Chart('canvas1', {
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

}


  monthwiseExpensesChartList(){
    this.ExpensesInMonth=[];
    this.MonthwiseExpenseAmt=[];
    //this.chart=[];

     if(this.chart) {
		 	this.chart.destroy();
		 }

  this.expenseService.monthwiseExpensesChartList(this.branchId).subscribe((result: ExpenseChart[]) => {
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
}



  currentMonthExpensesChartList(){
    this.CurrentMonthExpenses=[];
    this.CurrentMonthExpenseAmt=[];
    //this.chart3=[];

     if(this.chart3) {
		 	this.chart3.destroy();
		 }

  this.expenseService.currentMonthExpensesChartList(this.branchId).subscribe((result: ExpenseChart[]) => {
    result.forEach(x => {
      this.CurrentMonthExpenses.push(x.ExpenseName);
      this.CurrentMonthExpenseAmt.push(x.PaidAmount);
    });
    this
    this.chart3 = new Chart('canvas2', {
      type: 'pie',

      data: {
        labels: this.CurrentMonthExpenses,
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
}





  getCurrentMonthCoursewiseIncome(){
    this.CurrentMonthCourses=[];
    this.CurrentMonthIncome=[];
    //this.chart4=[];

     if(this.chart4) {
		 	this.chart4.destroy();
		 }

  this.month_Name = new Date();
  this.feesTransactionService.getCurrentMonthCoursewiseIncome(this.branchId).subscribe((result: FeesTransaction[]) => {
    result.forEach(x => {
      this.CurrentMonthCourses.push(x.Course);
      this.CurrentMonthIncome.push(x.Income);
    });
    this
    this.chart4 = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: this.CurrentMonthCourses,
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
}



  getBranchList(){
    this.branchService.getBranches(this.user.InstituteId).subscribe(data=>{
        this.branchList=data;
        //this.firstBranchId= Number(this.branchList[0]['BranchId']);
    })
  }


  selectBranch(event:any){
    this.branchSelection=event.target.value;
    if(this.currentRole=='Admin'){
      this.branchId=this.branchSelection
    }
    else{
      this.branchId=this.user.BranchId
    }

    this.getMonthwiseIncome();
    this.getCurrentMonthCoursewiseIncome();
    this.currentMonthExpensesChartList();
    this.monthwiseExpensesChartList();
    

  }

  getUserRole() {
    this.currentRole = Utils.GetUserRole();
  }


  showGraph(template: TemplateRef<any>) {
this.Month=[];
this.Income=[];
this.TotalStudents=[];
this.Expenses=[];
    this.expenseService.getIncomeAndExpenseData(this.branchId).subscribe((result: IncomeExpense[]) => {
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
          datasets: [{
            label: 'Expenses',
            data: this.Expenses,
            backgroundColor:"#3cb371"
        }, {
            label: 'Income',
            data: this.Income,
            backgroundColor:"#0000FF"
        },
        {
          label: 'TotalStudents',
          data: this.TotalStudents,
          backgroundColor: "#9966FF"
      }
      ],
        labels: this.Month
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


    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      animated: true,
      backdrop: 'static'
    });
  }


  public user = Utils.GetCurrentUser();
}

