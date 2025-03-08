import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { GridLayout, Image, PlainGalleryConfig, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Items from 'app/Shared/Model/item';
import { ItemsServiceService } from 'app/Shared/Services/Items/items-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items-image',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.scss']
})
export class ItemsDetailsComponent implements OnInit {
  /**
    * Emitted Events
    *
    * @param $event
    * @param {ToastrService} _toastrService
 
    */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  itemid: number;
  item: Items;




  position = 'top-right';

  Spinner = true;
  constructor(private modalService: NgbModal, private itemService: ItemsServiceService, private router: Router, private activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.activatedRoute.params.subscribe(params => {
      this.itemid = +params['id'];
      if (this.itemid == null || this.itemid == undefined) {
        // this.router.navigate(['./voucher']);
      } else {
        if (this.itemid == 0) {

        } else {
          this.inititemdetails();
        }
        //  this.showorderdetinit();

      }
    });
  }

  ngOnInit() {
  }
  inititemdetails() {
    //console.log(this.itemid);
    this.itemService.itembyiddetails(this.itemid).subscribe(
      (res: JSON) => {
        console.log(res);
        if (res["status"]) {
          this.item = res['item'];

          this.Spinner = false;
        } else {

        }
      }
    );
  }

  disable: boolean = false;
  saveItem() {
    this.disable = true;
    this.itemService.updateItem(this.item).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          // this.router.navigate(['./orderdet/'+this.neworderid]);
          // img['modal']['img'].substring(img['modal']['img'].lastIndexOf('/')+1);          
          // this.addToast({ title: res['message'], timeout: 5000, theme: 'default', position: 'top-left', type: 'success' });
          this._toastrService.success(
            res['message'],
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
        } else {
        }
        this.disable = false;

      },
      err => this.disable = false

    );
  }





}
