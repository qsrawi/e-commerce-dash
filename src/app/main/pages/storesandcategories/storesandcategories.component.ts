import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Categorie from 'app/Shared/Model/category';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-storesandcategories',
  templateUrl: './storesandcategories.component.html',
  styleUrls: ['./storesandcategories.component.scss']
})
export class StoresandcategoriesComponent implements OnInit {

  /**
   * Emitted Events
   *
   * @param $event
   * @param {ToastrService} _toastrService
   */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  storeCat: JSON[] = [];
  categoryList: Categorie[] = [];
  subcategoryList: Categorie[] = [];
  // storeoption: Array<IOption> = [];
  selectedstore;
  Spinner = true; Spinner2 = false;
  Editsubcat;
  position = 'top-right';
  spinnerSave = false;
  constructor(private modalService: NgbModal, private router: Router, private storecatservie: StoresandcategoriesService, private _toastrService: ToastrService) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.init();
  }

  ngOnInit() {
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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
    this.Spinner2 = true;
    //get categories
    //console.log(this.selectedstore);
    this.storecatservie.getStoreCategories('ItemCategory', this.selectedstore).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.categoryList = res['categories'];
          //console.log(this.categoryList[0].subcategorylist);
          this.Spinner2 = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }
  newmaincatiegoryrow() {
    this.categoryList.push(new Categorie(
      null, null, null,
      this.categoryList[this.categoryList.length - 1].AR_LKP_Type,
      this.categoryList[this.categoryList.length - 1].LKP_ID + 1,
      this.categoryList[this.categoryList.length - 1].LKP_Type,
      this.categoryList[this.categoryList.length - 1].RelatedID, []));
  }
  addNewSubCategory(index) {
    //console.log(index);
    this.categoryList[index].subcategorylist.push(new Categorie(null, null, null, null, null, null, null, null));

  }
  searchUsers() {
    //console.log("search");

  }
  save() {
    this.Spinner2 = true;
    //console.log(this.categoryList);
    //console.log(this.selectedstore);
    // return;
    this.storecatservie.savecategory(this.categoryList, this.selectedstore).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.categoryList = res['categories'];
          this.Spinner2 = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }

  opensubcategorymeta(event, subcat) {
    //console.log(subcat);
    this.Editsubcat = subcat;
    this.modalService.open(event, {
      centered: true,
      size: 'md'
    });
    // document.querySelector('#' + event).classList.add('md-show');
  }

  savemetasubcategory() {
    this.spinnerSave = true;

    console.log(this.Editsubcat);
    this.storecatservie.savesubcategorymetaanddescription(this.Editsubcat).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this._toastrService.error(
            res['msg'],
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          // this.addToast({ title: res['msg'], timeout: 5000, theme: 'default', position: 'top-left', type: 'success' });
          this.spinnerSave = false;
            this.modalService.dismissAll();
          // document.querySelector('#' + 'modal-editsub').classList.remove('md-show');

        } else {
          //console.log("هناك خطأ ما...");
          // this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }
  // private cloneOptions(options: Array<IOption>): Array<IOption> {
  //   return options.map(option => ({ value: option.value, label: option.label }));
  // }

}
