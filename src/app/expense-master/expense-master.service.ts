import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ExpenseMaster } from '../shared/Model/Expenses';
import { Utils } from './../Utils';

@Injectable({
  providedIn: 'root'
})

export class ExpenseMasterService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllExpenses() {
    return this.http.get<ExpenseMaster[]>(environment.APIBASEURL + 'Expenses/GetAllExpenseType', Utils.getAuthHeader()).pipe(map(data => data as ExpenseMaster[]))
  }

  createNewExpense(expense) {
    return this.http.post<ExpenseMaster>(environment.APIBASEURL + 'Expenses/CreateExpenseType', expense, Utils.getAuthHeader())
      .pipe(
        tap((expense: ExpenseMaster) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<ExpenseMaster>('expense'))
      );
  }

  deleteExpense(id: number) {
    return this.http.post(environment.APIBASEURL + 'Expenses/DeleteExpenseType/' + id, null, Utils.getAuthHeader())
  }

  editExpense(expense): Observable<ExpenseMaster> {
    return this.http.post<ExpenseMaster>(environment.APIBASEURL + 'Expenses/UpdateExpenseType', expense, Utils.getAuthHeader())
      .pipe(
        tap((expense: ExpenseMaster) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<ExpenseMaster>('updateExpense'))
      );
  }
}
