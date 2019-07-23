import { element } from 'protractor';
import { Expenses,ExpenseChart, IncomeExpense } from './../../../Model/Expenses';
import { Utils } from './../../../Utils';
import { ExpenseService } from './../../../ExpenseTransaction/expense.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Chart } from 'chart.js'; 
@Component({
  selector: 'app-authorised-layout',
  templateUrl: './authorised-layout.component.html',
  styleUrls: ['./authorised-layout.component.css']
})
export class AuthorisedLayoutComponent implements OnInit {
  public expenses: Expenses[];
  Expense = [];  
  Amount = [];  
  chart = []; 

  Income = [];
  Expenses = [];
  chart1=[];

  constructor(private expenseService:ExpenseService) { }

  ngOnInit() {
    
    
  //   this.expenseService.expensesList(this.user.BranchId).subscribe((result: Expenses[]) =>{
  //     result.forEach(x => {  
  //     this.Expense.push(x.ExpenseType);  
  //     this.Amount.push(x.Paid); 
  //   }); 
  //   this 
  //   this.chart = new Chart('canvas', {  
  //     type:  'doughnut', 
  //     innerRadius: 90,
  //     data: {  
  //       labels: this.Expense, 
  //       innerRadius: 90, 
  //       datasets: [  
  //         {  
  //           data: this.Amount,  
  //           borderColor: '#3cba9f',  
  //           backgroundColor: [  
  //             "#3cb371",  
  //             "#0000FF",  
  //             "#9966FF",  
  //             "#4C4CFF",  
  //             "#00FFFF",  
  //             "#f990a7",  
  //             "#aad2ed",  
  //             "#FF00FF",  
  //             "Blue",  
  //             "Red",  
  //             "Blue"  
  //           ],  
  //           fill: true  
  //         }  
  //       ]  
  //     },  
  //     options: {
  //       legend: {  
  //         display: true  
  //       },  
  //       scales: {  
  //         xAxes: [{  
  //           display: true  
  //         }],  
  //         yAxes: [{  
  //           display: true  
  //         }],  
  //       }  
  //     }  
  //   });  
  // }); 

  // Chart.pluginService.register({
  //   beforeDraw: function(chart) {
  //     var width = chart.chart.width,
  //         height = chart.chart.height,
  //         ctx = chart.chart.ctx;
  
  //     ctx.restore();
  //     var fontSize =2; //(height / 114).toFixed(2);
  //     ctx.font = fontSize + "em sans-serif";
  //     ctx.textBaseline = "middle";
  
  //     var text = "Expenses",
  //         textX = Math.round((width - ctx.measureText(text).width) / 2),
  //         textY = height / 2;
  
  //     ctx.fillText(text, textX, textY);
  //     ctx.save();
  //   }
  // });


  this.expenseService.expensesChartList(this.user.BranchId).subscribe((result: ExpenseChart[]) =>{
      result.forEach(x => {  
      this.Expense.push(x.ExpenseName);  
      this.Amount.push(x.PaidAmount); 
    }); 
    this 
    this.chart = new Chart('canvas', {  
      type:  'doughnut', 
      innerRadius: 90,
      data: {  
        labels: this.Expense, 
        innerRadius: 90, 
        datasets: [  
          {  
            data: this.Amount,  
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

  Chart.pluginService.register({
    beforeDraw: function(chart) {
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
  
      ctx.restore();
      var fontSize =2; //(height / 114).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
  
      var text = "Expenses",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
  
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  });






  this.expenseService.getIncomeAndExpenseData(this.user.BranchId).subscribe((result: IncomeExpense[]) =>{
    result.forEach(x => {  
    this.Income.push(x.Income);  
    this.Expenses.push(x.Expense); 
  }); 
  this 
  this.chart1 = new Chart('canvas1', {  
    type:  'pie', 
    innerRadius: 90,
    data: {  
      labels: this.Income, 
      innerRadius: 90, 
      datasets: [  
        {  
          data: this.Expenses,  
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

Chart.pluginService.register({
  beforeDraw: function(chart) {
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    ctx.restore();
    var fontSize =2; //(height / 114).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    var text = "Expenses",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});




}  



  public user=Utils.GetCurrentUser();
  }
