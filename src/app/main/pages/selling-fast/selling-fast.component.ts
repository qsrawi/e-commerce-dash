import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Categorie from 'app/Shared/Model/category';
import Items from 'app/Shared/Model/item';
import { ItemsServiceService } from 'app/Shared/Services/Items/items-service.service';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-selling-fast',
  templateUrl: './selling-fast.component.html',
  styleUrls: ['./selling-fast.component.scss']
})
export class SellingFastComponent implements OnInit {
  /**
  * Emitted Events
  *
  * @param $event
  * @param {ToastrService} _toastrService
 
  */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  sellingfastlist: Items[] = [];
  Spinner = true;

  categoryList: Categorie[] = []; SUBcategoryList: Categorie[] = [];

  selectedcat;
  selectedSUBcat;
  Spinner2 = false;
  tablespinner = false;
  getted = false;
  position = 'top-right';

  constructor(private router: Router, private itemservice: ItemsServiceService, private _toastrService: ToastrService, private storecatservie: StoresandcategoriesService) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    // this.getrecomendedforyou();
    // this.getcategories();
    this.init();
  }

  Spinner3 = false;

  changestore() {
    this.Spinner3 = true;
    this.getcategories();
  }
  storeCat: JSON[] = [];

  init() {
    //console.log('iniiiiiiiiiiit');

    this.storecatservie.getall().subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.storeCat = res['nav'];

          this.Spinner = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }

  selectedstore;
  ngOnInit() {

  }
  changesellingfast(ItemID, val) {
    //console.log(val);
    this.itemservice.updateSellingFast(ItemID, val).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {

        } else {
          this._toastrService.error(
            'Somthing Wrong',
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
        }
      }
    );
  }
  getcategories() {
    this.sellingfastlist = [];
    this.SUBcategoryList = [];
    this.categoryList = [];
    this.itemservice.getcategoriesitem(this.selectedstore).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.categoryList = res['categories'];
          //console.log(this.categoryList);
          
          this.Spinner3 = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );

  }
  changecat() {
    this.Spinner2 = true;
    this.sellingfastlist = [];
    this.SUBcategoryList = [];
    let LUK_ID: number = this.categoryList.find(x => x.ID == this.selectedcat).LKP_ID;
    this.itemservice.getsubcategories(LUK_ID).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.SUBcategoryList = res['subcategories'];
        
          this.Spinner2 = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }

  changeSUBcat() {
    //console.log('changeSUBcat');
    this.getSellingFast();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
  ItemSpinner: boolean = false;

  getSellingFast() {
    //console.log(this.dtExportButtonOptions);
    this.ItemSpinner = true;

    let LUK_ID: number = this.categoryList.find(x => x.ID == this.selectedcat).LKP_ID;
    let SUB_LUK_ID: number = this.SUBcategoryList.find(x => x.ID == this.selectedSUBcat).LKP_ID;
    this.itemservice.getsellingfastItem(LUK_ID, SUB_LUK_ID).subscribe(
      (res: Items[]) => {
        this.sellingfastlist = [];
        this.sellingfastlist = res;
        this.ItemSpinner = false;

      }
    );
  }

}
