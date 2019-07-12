import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {ExpenseMaster} from '../Model/Expenses';
import { Utils } from '../Utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Authorization': `Bearer ${Utils.GetAccessToken()}` })
};


@Injectable({
  providedIn: 'root'
})

export class ExpenseMasterService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

getAllExpenses()
{
  debugger;
  // return this.http.get<ExpenseMaster[]>(environment.APIBASEURL + 'Expenses/GetAll',httpOptions)
  // .pipe(map(ExpenseMaster=>{
  //   console.log(ExpenseMaster);
  //   return ExpenseMaster;
  // }));
  return this.http.get<ExpenseMaster[]>(environment.APIBASEURL + 'Expenses/GetAll',httpOptions).pipe(map(data => data as ExpenseMaster[]))
}

createNewExpense(expense)
{
  debugger;
   return this.http.post<ExpenseMaster>(environment.APIBASEURL + 'Expenses/CreateExpenses', expense,httpOptions)  
   .pipe(
     tap((expense: ExpenseMaster) => console.log(`added expenseid=${expense.ExpenseId}`)),
     catchError(this.handleError<ExpenseMaster>('expense'))
   );
}

deleteExpense(id:number)
{
  debugger;
  return this.http.post(environment.APIBASEURL + 'Expenses/DeleteExpense/' + id,null, httpOptions)
}

 editExpense(expense): Observable<ExpenseMaster>{
  return this.http.post<ExpenseMaster>(environment.APIBASEURL + 'Expenses/UpdateExpenses', expense,httpOptions)  
  .pipe(
    tap((expense: ExpenseMaster) => console.log(`added expenseid=${expense.ExpenseId}`)),
    catchError(this.handleError<ExpenseMaster>('updateExpense'))
  );
}
}
