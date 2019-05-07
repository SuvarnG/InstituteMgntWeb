import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BankTransaction } from '../Model/BankTransaction';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StaffMaster } from '../Model/StaffMaster';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BanktransactionService {
  private Url = environment.APIBASEURL + 'Bank/GetAllBankTrn';
  private CreateUrl = environment.APIBASEURL + 'Bank/CreateBankTrn';
  private TrnByWhomUrl = environment.APIBASEURL + 'Bank/Trn_By';
  public listStaff: StaffMaster[];
  constructor(private http: HttpClient) { }

  banktransactionList() {
    return this.http.get<BankTransaction[]>(this.Url, httpOptions)
      .pipe(map(banktransaction => {
        return banktransaction;
      }));
  }


  GetStaffList() {
    return this.http.get(environment.APIBASEURL + 'Teacher/GetTeacher').pipe(map(data => data["Teacher"] as StaffMaster[]))
  }

  banktransaction(banktransaction: BankTransaction) {

    return this.http.post<BankTransaction>(this.CreateUrl, banktransaction, httpOptions)
  }

}



