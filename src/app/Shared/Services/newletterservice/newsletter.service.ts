import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Newsletterecommerce } from 'app/Shared/Model/newsletterecommerce';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  token: string = localStorage.getItem('accessToken');
  server: string = "http://192.119.110.192:5001/api/"
  // server:string="http://31.220.60.223/server/";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });
  constructor(private http: HttpClient) { }

  getall() {
    return this.http.get<any>(this.server + "customerservice/getallnewsletter", { headers: this.headers });
  }
  savechanges(obj) {
    //console.log(obj.news);
    return this.http.post<JSON>("http://192.119.110.192:5001/newsletter", obj);
  }
  deletetemplete(id:number) {
    
    return this.http.get<boolean>(this.server +`customerservice/deletetemplete/${id}`,{ headers: this.headers });

  }

  deletetempleteecommerce(id:number) {
    return this.http.get<boolean>(this.server +`customerservice/deletetempleteecommerce/${id}`,{ headers: this.headers });
  }
  sendtoall(tempid:number,pass:string){
    return this.http.get<JSON>(this.server + `customerservice/sendtoall/${tempid}/${pass}`, { headers: this.headers });

  }

  getallnewsletterecommerce() {
    return this.http.get<Newsletterecommerce[]>(this.server + "customerservice/getallnewsletterecommerce", { headers: this.headers });
  }


  setacctivestatus(id:number){
    return this.http.get<boolean>(this.server +`customerservice/settoactivestatus/${id}`,{ headers: this.headers });
  }


  getallwhytoChooseecommerce(type) {
    return this.http.get<any[]>(this.server + "customerservice/getwhyToChoose/"+type, { headers: this.headers });
  }

  whytochoosedetails(id) {
    return this.http.get<any>(this.server + "customerservice/whytochoosedetails/"+id, { headers: this.headers });
  }

  uploadfile(obj) {
    //console.log(obj.news);
    return this.http.post<JSON>("http://192.119.110.192:5001/whotoChooseattach", obj);
  }


  insertwhy(obj) {
    //console.log(obj.news);
    return this.http.post<JSON>("http://192.119.110.192:5001/api/customerservice/InsertwhyToChoose", obj, { headers: this.headers });
  }
  deletewhytochoose(id:number) {
    return this.http.get<boolean>(this.server +`customerservice/deletewhytochoose/${id}`,{ headers: this.headers });
  }
}
