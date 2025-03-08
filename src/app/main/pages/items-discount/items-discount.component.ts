import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { GridLayout, Image, PlainGalleryConfig, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';
import Categorie from 'app/Shared/Model/category';
import Items from 'app/Shared/Model/item';
import { ItemsServiceService } from 'app/Shared/Services/Items/items-service.service';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items-discount',
  templateUrl: './items-discount.component.html',
  styleUrls: ['./items-discount.component.scss']
})
export class ItemsDiscountComponent implements OnInit {
  /**
    * Emitted Events
    *
    * @param $event
    * @param {ToastrService} _toastrService
 
    */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  categoryList: Categorie[] = []; SUBcategoryList: Categorie[] = [];
  itemsList: Items[] = [];

  selectedstore;
  storeCat: JSON[] = [];
  position = 'top-right';
  radiovalue = 'RelatedNo';
  upSpiner = false;
  SearchInput;
  subCategoreyDiscountPecentage: Number;
  images: Image[] = [
    new Image(44545656452, { img: 'assets/images/light-box/l1.jpg' }),
    new Image(44545656453, { img: 'assets/images/light-box/l5.jpg' }),
    new Image(44545656454, { img: 'assets/images/light-box/l6.jpg' }),
    new Image(44545656455, { img: 'assets/images/light-box/l4.jpg' }),
    new Image(44545656456, { img: 'assets/images/light-box/l5.jpg' }),
    new Image(44545656457, { img: 'assets/images/light-box/l6.jpg' })
  ];
  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '150px', height: '150px' }, { length: 6, wrap: true })
  };
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));

  public demoForm = new FormGroup({
    files: this.filesControl
  });
  selectedcat;
  selectedSUBcat;
  Spinner = true;
  Spinner2 = false;
  Spinner3 = false;
  // dtExportButtonOptions: DataTables.Settings = {
  //   paging: false
  // };
  // dtExportButtonOptions: DataTables.Settings = {};
  // dtTrigger = new Subject();
  getted = false;
  tablespinner = false;
  constructor(private router: Router, private _toastrService: ToastrService, private itemService: ItemsServiceService, private storecatservie: StoresandcategoriesService) {
    // this.getcategories();
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.init();
  }

  ngOnInit() {

  }
  init() {
    //console.log('iniiiiiiiiiiit');

    this.storecatservie.getall().subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.storeCat = res['nav'];
          // for (let i = 0; i < this.storeCat.length; i++) {
          //   this.storeoption.push({ value: this.storeCat[i]['StoreID'], label: this.storeCat[i]['StoreEnName'] });
          // }
          // this.storeoption = this.cloneOptions(this.storeoption);
          //console.log(this.storeoption);
          this.Spinner = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }

  changestore() {
    this.Spinner3 = true;
    this.getcategories();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //console.log("ngOnDestroy");

    // this.dtTrigger.unsubscribe();
  }
  openitemimage(itemid: number) {
    //console.log(itemid);

    // window.open('./itemsimage/'+itemid, '_blank');
    this.router.navigate(['./itemsimage/' + itemid]);
    //.then(result => { window.open('./itemsimage/' + itemid, '_blank'); });

  }
  getcategories() {
    this.itemsList = [];
    this.SUBcategoryList = [];
    this.categoryList = [];
    this.itemService.getcategoriesitem(this.selectedstore).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.categoryList = res['categories'];

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
    this.itemsList = [];
    this.SUBcategoryList = [];
    //console.log(this.selectedcat);
    let LUK_ID: number = this.categoryList.find(x => x.ID == this.selectedcat).LKP_ID;
    this.itemService.getsubcategories(LUK_ID).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.SUBcategoryList = res['subcategories'];
          //console.log(this.SUBcategoryList);

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
    this.getitems();
  }



  ItemSpinner: boolean = false;

  getitems() {
    this.itemsList = [];
    this.ItemSpinner = true;
    // this.tablespinner=true;
    let LUK_ID: number = this.categoryList.find(x => x.ID == this.selectedcat).LKP_ID;
    let SUB_LUK_ID: number = this.SUBcategoryList.find(x => x.ID == this.selectedSUBcat).LKP_ID;
    this.subCategoreyDiscountPecentage = this.SUBcategoryList.find(x => x.ID == this.selectedSUBcat).DiscountPercentage;
    console.log(this.subCategoreyDiscountPecentage);

    this.itemService.getitems(LUK_ID, SUB_LUK_ID, 0).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.itemsList = res['items'];
          // console.log(this.itemsList);

          // if (this.getted == false) {
          //   // this.next1();
          //   this.getted = true;
          // }
          // this.tablespinner=false;
          this.ItemSpinner = false;

        } else {
          this.ItemSpinner = false;

          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }

  


  public toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }


  savediscountfun() {
    let SUB_LUK_ID: Number = this.SUBcategoryList.find(x => x.ID == this.selectedSUBcat).ID;
    console.log(SUB_LUK_ID);

    this.itemService.changeCategoryDiscountPercentage(SUB_LUK_ID, this.subCategoreyDiscountPecentage).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.SUBcategoryList.find(x => x.ID == this.selectedSUBcat).DiscountPercentage = this.subCategoreyDiscountPecentage;
          // this.addToast({title:`${res['msg']}`, timeout: 5000, theme:'default', position:'top-left', type:'success'})
          this._toastrService.success(
            `${res['msg']}`,
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
        } else {
          this._toastrService.error(
            'Somthing Wrong',
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          //console.log("هناك خطأ ما...");
          // this.addToast({title:'Something Wrong', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }


}
