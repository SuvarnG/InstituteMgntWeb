import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Bank } from '../Model/Bank'
import { map, tap, catchError } from 'rxjs/operators'; import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Utils } from '../Utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  'Authorization': `Bearer ${Utils.GetAccessToken()}`})
};

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private deleteUrl = environment.APIBASEURL + 'Bank/InactiveBank/';
  private CreateUrl = environment.APIBASEURL + 'Bank/CreateBankAccount';
  private UpdateUrl = environment.APIBASEURL + 'Bank/UpdateBankAccount';

  constructor(private http: HttpClient) { }




  bankList(InstituteId:number) {
    // return this.http.get<Bank[]>( environment.APIBASEURL + 'Bank/GetAll'+'/'+InstituteId, httpOptions)
    //   .pipe(map(bank => {
    //     return bank;
    //   }));


      return this.http.get(environment.APIBASEURL+ 'Bank/GetAll'+'/'+InstituteId,httpOptions).pipe(map(data => data as Bank[]))
  }

  delete(ID): Observable<Bank> {

    return this.http.post<Bank>(this.deleteUrl + ID,null, httpOptions).pipe(
      tap(_ => console.log(`deleted Bank id=${ID}`))
    );
  }

  bank(bank: Bank) {
    return this.http.post<Bank>(this.CreateUrl, bank, httpOptions).pipe(map(bank => { return bank }))
  }


  editAccNo(bank): Observable<Bank> {

    return this.http.post<Bank>(this.UpdateUrl, bank, httpOptions).pipe(
      tap((bank: Bank) => console.log('Update BankAccountId=${bank.BankAccountId}'))

    );
  }
}









