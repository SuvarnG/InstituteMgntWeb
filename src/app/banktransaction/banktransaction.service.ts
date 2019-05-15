import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BankTransaction } from '../Model/BankTransaction';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StaffMaster } from '../Model/StaffMaster';
import { Observable } from 'rxjs';
import { BankNames } from '../Model/BankNames';
import { Accountnumbers } from '../Model/AccountNumber';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BanktransactionService {
  private Url = environment.APIBASEURL + 'Bank/GetAllBankTrn';
  private CreateUrl = environment.APIBASEURL + 'Bank/CreateBankTrn';
  private UpdateUrl = environment.APIBASEURL + 'Bank/UpdateBankTrn';

  public listStaff: StaffMaster[];
  public listaccno: BankTransaction[];
  public bankname: BankNames[];
  constructor(private http: HttpClient) { }

  banktransactionList() {
    return this.http.get<BankTransaction[]>(this.Url, httpOptions)
      .pipe(map(banktransaction => {
        return banktransaction;
      }));
  }


  GetStaffList() {
    return this.http.get(environment.APIBASEURL + 'Teacher/GetTeacher').pipe(map(data => data as StaffMaster[]))
  }

  GetBankList() {
    return this.http.get(environment.APIBASEURL + 'Bank/GetAll').pipe(map(data => data as BankNames[]))
  }

  GetAccountNumber(BankName) {

    return this.http.get(environment.APIBASEURL + 'Bank/GetAccoNo/' + BankName).pipe(map(data => data as BankTransaction[]))

    // return this.http.get(environment.APIBASEURL+'Bank/GetAccoNo/'+BankName
    // ).pipe
    // (map(data=>{
    //   return data as BankTransaction[]
    // }));
  }

  banktransaction(banktransaction: BankTransaction) {

    return this.http.post<BankTransaction>(this.CreateUrl, banktransaction, httpOptions).pipe(map(banktransaction => { return banktransaction }))
  }


  Edit(banktransaction): Observable<BankTransaction> {

    return this.http.post<BankTransaction>(this.UpdateUrl, banktransaction, httpOptions).pipe(
      tap((banktransaction: BankTransaction) => console.log('Update Id=${banktransaction.ID}'))

    );
  }

}



