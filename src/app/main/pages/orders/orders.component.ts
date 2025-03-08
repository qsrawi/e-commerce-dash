import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Order from 'app/Shared/Model/Order';
import OrderItem from 'app/Shared/Model/OrderItem';
import { OrderTrack } from 'app/Shared/Model/OrderTrack';
import { OrdersService } from 'app/Shared/Services/orders/orders.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  /**
   * Emitted Events
   *
   * @param $event
   */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  public isReload = false;

  /**
   * Reload
   *
   * @param $event
   */
  reload($event) {
    // This is fake API call example for reload
    if ($event === 'reload') {
      console.log($event, ': Start');
      this.isReload = true;
      setTimeout(() => {
        this.isReload = false;
        console.log($event, ': End');
      }, 5000);
    }
  }
  Spinner = true;
  startdate: any;
  enddate: any;
  OrderList: Order[] = [];
  orderdet: Order;
  OrderTrackList: OrderTrack[] = [];
  // statusoption: Array<IOption> = [];
  message: string;
  messageApiKey:string;
  filterstatus:number=null;
  // showoperatrion=true;
  constructor(private router: Router, private orderservice: OrdersService,private modalService: NgbModal) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.startdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    this.enddate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    
    this.startdate={
      year:+this.startdate.toString().slice(0,4),
      month:+this.startdate.toString().slice(5,7),
      day:+this.startdate.toString().slice(8,10)
    };
    this.enddate={
      year:+this.enddate.toString().slice(0,4),
      month:+this.enddate.toString().slice(5,7),
      day:+this.enddate.toString().slice(8,10)
    };
    this.getstatus();
    // this.get();
  }

  get barcodeValue() {
    return this.orderdet.VoucherID + '';
  }
  getstutusbyid(stid: number) {

    return this.OrderTrackList.find(a => a.LKP_ID == stid).EnName;
  }
  getstatus() {
    this.Spinner = true;
    this.orderservice.getorderTrackdash().subscribe(
      (ss: JSON) => {
        //console.log(ss);
        this.OrderTrackList = ss['stat'];
        console.log(this.OrderTrackList);
        
        this.message = ss['message'];
        this.messageApiKey = ss['messageApiKey'];
        this.get();
      }
    );
  }
  change: boolean = false;
  changeorderStatus(orderid: number, StatusID: number) {
    //console.log(orderid);
    //console.log(StatusID);
    let mss: string = '';
    mss = this.message['message'];
    let index = this.OrderList.findIndex(a => a.VoucherID == orderid);
    console.log(this.OrderList[index]);
    var re = /{ORDERID}/gi;
    var re2 = /{AMOUNT}/gi;
    var re3 = /{STATUSNAME}/gi;
    console.log(mss);

    mss = mss.replace(re, orderid.toString());
    mss = mss.replace(re2, this.getordertotal(this.OrderList[index].orderItems).toString() + ' ' + this.OrderList[index].CurruncySymbol);
    mss = mss.replace(re3, this.getstutusbyid(StatusID));

    console.log(this.message);
    console.log(mss);

    this.change = true;
    this.orderservice.changeOrderTrackStatus(orderid, StatusID).subscribe((res: boolean) => {
      if (res == true) {
        // var rew = /+/gi;
        let phone = this.OrderList[index].billingAddress.phone;
        phone = phone.replace('+', "00");
        if (phone != null && phone != undefined && phone.length > 9) {
          this.orderservice.sendmessage(phone, mss,this.messageApiKey).subscribe((res) => {
            console.log(res);

          });
        }

      }
      this.change = false;
    });
  }
  // private cloneOptions(options: Array<IOption>): Array<IOption> {
  //   return options.map(option => ({ value: option.value, label: option.label }));
  // }
  myFunction() {

  }
  
  captureScreen() {
    // this.showoperatrion=false;
    var x = document.getElementById("openration");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    var xxx = document.getElementById("Statusshowhide");
    if (xxx.style.display === "none") {
      xxx.style.display = "block";
    } else {
      xxx.style.display = "none";
    }

    var data = document.getElementById('contentToConvert');
    console.log(data);

    html2canvas(data, { useCORS: true }).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      //pdf.save('Order #'+this.orderdet.VoucherID + '.pdf'); // Generated PDF 
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }// this.showoperatrion=true;  
      if (xxx.style.display === "none") {
        xxx.style.display = "block";
      } else {
        xxx.style.display = "none";
      }
    });
  }
  convertdatetODate(olddate:any){
    return olddate.year+'-'+olddate.month+"-"+olddate.day;

  }
  get() {
    this.Spinner = true;
    let ssstartdate=this.convertdatetODate(this.startdate);
    let eeenddate=this.convertdatetODate(this.enddate);

    // return;
    // let edate = new Date(this.enddate);
    // edate.setDate(edate.getDate() + 1);

    let data = {
      start: ssstartdate,
      end: eeenddate
    };
    console.log(data);
    
    //console.log("reservation get");
    //console.log(data);
    this.orderservice.gerordersbydate(data).subscribe(
      (ss: Order[]) => {
        console.log(ss);
        this.OrderList = ss;
        this.OrderList.forEach(element => {
          if (typeof element.StatusID === 'number') {
            element.StatusID = element.StatusID;
            if (element.DueDate != null)
              element.DueDate = (new Date(element.DueDate)).toISOString().slice(0, 10);
          }
        });
        this.Spinner = false;

      }
    );
  }

  changeinestimatetime(order: Order) {
    //console.log(order);
    this.orderservice.changeOrderEstimatedDate(order.VoucherID, order.DueDate).subscribe((res: boolean) => {
    });
  }
  getordertotal(orderitem: OrderItem[]) {
    let sum = 0.0;

    for (let i = 0; i < orderitem.length; i++) {
      sum += (orderitem[i]['PriceLevel_Price'] * orderitem[i]['quantity']) / orderitem[i]['TheRate'];

    }
    return sum;

  }
  openorderdetModa(order: Order,modalSLC) {
    this.orderdet = order;
    this.modalService.open(modalSLC, {
      centered: true,
      size: 'xl'
    });

  }

  getitems() {
    //console.log(this.orderdet.orderItems);

    return this.orderdet.orderItems;
  }
  ngOnInit() {
  }


}
