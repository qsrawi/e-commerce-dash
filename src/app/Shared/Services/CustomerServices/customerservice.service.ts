import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerServices } from 'app/Shared/Model/CustomerServices';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {
  token: string = localStorage.getItem('accessToken');
  server: string = "http://192.119.110.192:5001/api/"
  // server:string="http://31.220.60.223/server/";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });
  constructor(private http: HttpClient) { }

  getall() {
    return this.http.get<CustomerServices[]>(this.server + "customerservice/getall", { headers: this.headers });
  }
  savechanges(obj) {
    return this.http.post<boolean>("../customerserviceimages", obj);
  }
}
