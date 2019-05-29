import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Bank } from '../Model/Bank'
import { map, tap, catchError } from 'rxjs/operators'; import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private Url = environment.APIBASEURL + 'Bank/GetAll';
  private deleteUrl = environment.APIBASEURL + 'Bank/InactiveBank/';
  private CreateUrl = environment.APIBASEURL + 'Bank/CreateBankAccount';
  private UpdateUrl = environment.APIBASEURL + 'Bank/UpdateBankAccount';

  constructor(private http: HttpClient) { }




  bankList() {
    return this.http.get<Bank[]>(this.Url, httpOptions)
      .pipe(map(bank => {
        return bank;
      }));
  }

  Delete(ID): Observable<Bank> {

    return this.http.post<Bank>(this.deleteUrl + ID, httpOptions).pipe(
      tap(_ => console.log(`deleted Bank id=${ID}`))
    );
  }

  Bank(bank: Bank) {
    return this.http.post<Bank>(this.CreateUrl, bank, httpOptions).pipe(map(bank => { return bank }))
  }


  EditAccNo(bank): Observable<Bank> {

    return this.http.post<Bank>(this.UpdateUrl, bank, httpOptions).pipe(
      tap((bank: Bank) => console.log('Update BankAccountId=${bank.BankAccountId}'))

    );
  }
}









