import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderTrack } from 'app/Shared/Model/OrderTrack';
import { OrdersService } from 'app/Shared/Services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {
/**
   * Emitted Events
   *
   * @param $event
   * @param {ToastrService} _toastrService
  
   */
emittedEvents($event) {
  console.log('Action : ', $event);
}
  Spinner = true;
  OrderTrackList: OrderTrack[] = [];
  position = 'top-right';
  savestart=false;
  constructor(private router:Router, private orderservice: OrdersService, private _toastrService: ToastrService) {
    if(localStorage.getItem('accessToken')==null){
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.get();

  }
  get() {
    this.Spinner = true;
    this.orderservice.getorderTrack().subscribe(
      (ss: OrderTrack[]) => {
        //console.log(ss);
        this.OrderTrackList = ss;
        if (this.OrderTrackList.length == 0) {
          this.addnewstatus();
        }
        this.Spinner = false;
      }
    );
  }
  deletestatus(ss:OrderTrack){
    this.orderservice.deleteorderTrack(ss.ID).subscribe(
      (res:boolean) => {
        //console.log(ss);
       if(res){
         this.OrderTrackList.splice(this.OrderTrackList.findIndex(a=>a.ID==ss.ID),1);
         
       }
      }
    );
  }

  addnewstatus() {
    let ckinit:OrderTrack={
      ID:null,
      LKP_ID:null,
      LKP_Type: '',
      AR_LKP_Type: '',
      ArName:'',
      EnName: '',
      IsActive:false
  }
    this.OrderTrackList.push(ckinit);

  }
  changestatudtoactive(id: number,){
    //console.log(id);
    this.orderservice.setacctivestatusTrack(id).subscribe((res: boolean) => {
      // this.newsletterlist.splice(ind, 1);
      this.OrderTrackList.forEach(element => {
        if(element.ID!=id){
          element.IsActive=false;
        }
      });
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      // this.addToast({ title: "Done", timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    })
  }

  savechanges() {
    this.savestart=true;
    this.orderservice.saveorderTrackChanges(this.OrderTrackList).subscribe((res: OrderTrack[]) => {
      if (res) {
        this.OrderTrackList=res;
        this._toastrService.success(
          "Done ..",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
        // this.addToast({ title: 'Done ..', timeout: 5000, theme: 'default', position: 'top-left', type: 'success' });
        this.savestart=false;
      }

    });
  }
  ngOnInit() {
  }


}
