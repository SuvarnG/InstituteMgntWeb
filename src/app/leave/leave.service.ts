import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import{LeaveTran} from '../models/LeaveTran';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private Url = environment.APIBASEURL + 'Leave/GetAll';
  constructor(private http: HttpClient) { }

  getLeave(){
    
    return this.http.get<LeaveTran[]>(this.Url,httpOptions
      ).pipe(map(EnquiryList=>{
         return EnquiryList;
      }));
}
}