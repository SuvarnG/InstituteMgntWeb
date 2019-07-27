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
  Pexpense = [];  
  Pamount = [];  
  Bexpense = [];  
  Bamount = [];  
  Dexpense = [];  
  Damount = []
  Lexpense = [];  
  Lamount = [];;  
  chart = []; 
dChart=[];
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
      this.Pexpense.push(x.ExpenseName);  
      this.Pamount.push(x.PaidAmount); 
    }); 
    this 
    this.chart = new Chart('canvas', {  
      type:  'pie', 
      innerRadius: 90,
      data: {  
        labels: this.Pexpense, 
        innerRadius: 90, 
        datasets: [  
          {  
            data: this.Pamount,   
            backgroundColor: [  
              "#20a8d8",  
              "#f86c6b",  
              "#ffc107" ,
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

  
  this.expenseService.expensesChartList(this.user.BranchId).subscribe((result: ExpenseChart[]) =>{
    result.forEach(x => {  
    this.Dexpense.push(x.ExpenseName);  
    this.Damount.push(x.PaidAmount); 
  }); 
  this 
  this.dChart = new Chart('canvas2', {  
    type:  'doughnut', 
    innerRadius: 90,
    data: {  
      labels: this.Dexpense, 
      innerRadius: 90, 
      datasets: [  
        {  
          data: this.Damount,   
          backgroundColor: [  
            "#f86c6b",  
            "#ffc107" , 
            "#20a8d8", 
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


this.expenseService.expensesChartList(this.user.BranchId).subscribe((result: ExpenseChart[]) =>{
  result.forEach(x => {  
  this.Bexpense.push(x.ExpenseName);  
  this.Bamount.push(x.PaidAmount); 
}); 
this 
this.chart = new Chart('canvas1', {  
  type:  'bar',   
  data: {  
    labels: this.Bexpense, 
    datasets: [  
      { 
        label: 'Expenses',
        data: this.Bamount,  
        // borderColor: '#3cba9f',  
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


this.expenseService.expensesChartList(this.user.BranchId).subscribe((result: ExpenseChart[]) =>{
  result.forEach(x => {  
  this.Lexpense.push(x.ExpenseName);  
  this.Lamount.push(x.PaidAmount); 
}); 
this 
this.chart = new Chart('canvas3', {  
  type:  'line', 
  data: {  
    labels: this.Lexpense, 
    datasets: [  
      {   
        // backgroundColor: "#0000FF", 
        label: 'Expenses',
        data: this.Lamount,  
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

//   this.expenseService.getIncomeAndExpenseData(this.user.BranchId).subscribe((result: IncomeExpense[]) =>{
//     result.forEach(x => {  
//     this.Income.push(x.Income);  
//     this.Expenses.push(x.Expense); 
//   }); 
//   this 
//   this.chart1 = new Chart('canvas1', {  
//     type:  'pie', 
//     innerRadius: 90,
//     data: {  
//       labels: this.Income, 
//       innerRadius: 90, 
//       datasets: [  
//         {  
//           data: this.Expenses,  
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




}  



  public user=Utils.GetCurrentUser();
  }
