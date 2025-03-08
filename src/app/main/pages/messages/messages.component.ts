import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageModal } from 'app/Shared/Model/Message';
import { OrdersService } from 'app/Shared/Services/orders/orders.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
   /**
    * Emitted Events
    *
    * @param $event
    * @param {ToastrService} _toastrService
   
    */
   emittedEvents($event) {
    console.log('Action : ', $event);
  }
  Spinner=true;
  MessageList:MessageModal[]=[];
  startdate;
  enddate;
  
  constructor(private orderservice: OrdersService,private router:Router) {
    if(localStorage.getItem('accessToken')==null){
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.startdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    this.enddate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    this.get();
   }

  ngOnInit() {
  }


  get(){
    this.Spinner = true;

    let edate = new Date(this.enddate);
    edate.setDate(edate.getDate() + 1);

    let data = {
      start: this.startdate,
      end: edate
    };
    //console.log("reservation get");
    //console.log(data);
    this.orderservice.getmessage(data).subscribe(
      (ss: MessageModal[]) => {
        this.MessageList=ss;
        this.Spinner=false;
        
      }
    );

  }

}
