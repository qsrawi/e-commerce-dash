import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModal } from 'app/Shared/Model/Message';
import Order from 'app/Shared/Model/Order';
import { OrderTrack } from 'app/Shared/Model/OrderTrack';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  token: string = localStorage.getItem('token');
  // server:string="http://31.220.60.223/server/";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });
  constructor(private http: HttpClient) {
  }
  // ecommerceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  gerordersbydate(dates: any): Observable<Order[]> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
    return this.http.post<Order[]>('http://192.119.110.192:5001/api/order/getordersbyDate', dates, { headers: this.headers });
  }


  getmessage(dates: any): Observable<MessageModal[]> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
    return this.http.post<MessageModal[]>('http://192.119.110.192:5001/api/message/getmessages', dates, { headers: this.headers });
  }

  getorderTrack(): Observable<OrderTrack[]> {
    return this.http.get<OrderTrack[]>('http://192.119.110.192:5001/api/order/getorderstatus', { headers: this.headers });
  }
  deleteorderTrack(id): Observable<boolean> {
    return this.http.get<boolean>('http://192.119.110.192:5001/api/order/deleteorderstatus/'+id, { headers: this.headers });
  }
  getorderTrackdash(): Observable<JSON> {
    return this.http.get<JSON>('http://192.119.110.192:5001/api/order/getorderTrackdash', { headers: this.headers });
  }
  saveorderTrackChanges(ordertracklist: OrderTrack[]): Observable<OrderTrack[]> {
    return this.http.post<OrderTrack[]>('http://192.119.110.192:5001/api/order/saveorderTrackChanges', ordertracklist, { headers: this.headers });
  }

  setacctivestatusTrack(id:number){
    return this.http.get<boolean>(`http://192.119.110.192:5001/api/order/changeordertrackactivation/${id}`,{ headers: this.headers });
  }


  sendmessage(phone:string,message:string,messageApiKey:string){
     return this.http.get<any>(`http://smsservice.hadara.ps:4545/SMS.ashx/bulkservice/sessionvalue/sendmessage/?apikey=${messageApiKey}&to=${phone}&msg=${message}`);
  }
  changeOrderTrackStatus(orderid:number,stid:number){
    // trackkk ........................
    return this.http.get<boolean>(`http://192.119.110.192:5001/api/order/changeorderStatus/${orderid}/${stid}`,{ headers: this.headers });

  }

  changeOrderEstimatedDate(orderid:number,date:string){
    return this.http.get<boolean>(`http://192.119.110.192:5001/api/order/changeOrderEstimatedDate/${orderid}/${date}`,{ headers: this.headers });
  }
}
