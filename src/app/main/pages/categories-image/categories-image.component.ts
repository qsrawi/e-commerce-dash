import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Categorie from 'app/Shared/Model/category';
import { ItemsServiceService } from 'app/Shared/Services/Items/items-service.service';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-image',
  templateUrl: './categories-image.component.html',
  styleUrls: ['./categories-image.component.scss']
})
export class CategoriesImageComponent implements OnInit {

  /**
   * Emitted Events
   *
   * @param $event
   * @param {ToastrService} _toastrService

   */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  Spinner3 = false;
  categoryList: Categorie[] = []; SUBcategoryList: Categorie[] = [];

  storeCat: JSON[] = [];
  // storeoption: Array<IOption> = [];
  selectedstore;
  Spinner = true;
  position = 'top-right';
  // catoption: Array<IOption> = [];
  Spinner2 = false;
  selectedcat;
  files: string[] = [];
  spinnerSave = false;
  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  spinnerselectedinded = null;
  constructor(private router: Router, private storecatservie: StoresandcategoriesService, private itemService: ItemsServiceService, private _toastrService: ToastrService) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.init();
  }
  onFileChange(event) {
    //console.log(event.target.files);
    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
    this.showPreview(event);

  }
  get f() {
    return this.uploadForm.controls;
  }
  showPreview(event) {
    // this.file=event.target.files[0];

    const file = (event.target as HTMLInputElement).files[0];
    // this.uploadForm.patchValue({
    //   avatar: file
    // });
    // this.uploadForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  onFileChangesub(event, index) {
    //console.log(event.target.files);
    this.SUBcategoryList[index].ImageToUpload = event.target.files[0];
    this.showPreviewsub(event, index);
  }
  showPreviewsub(event, index) {
    // this.file=event.target.files[0];

    const file = (event.target as HTMLInputElement).files[0];
    // this.uploadForm.patchValue({
    //   avatar: file
    // });
    // this.uploadForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.SUBcategoryList[index].ImageToShow = reader.result as string;
    }
    reader.readAsDataURL(file)
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
    this.Spinner3 = true;
    this.getcategories();
  }
  getcategories() {
    this.categoryList = [];
    this.itemService.getcategoriesitem(this.selectedstore).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.categoryList = res['categories'];
          //console.log(this.categoryList);
          // for (let i = 0; i < this.categoryList.length; i++) {
          //   this.catoption.push({ value: this.categoryList[i].ID.toString(), label: this.categoryList[i].EnName });
          // }
          this.Spinner3 = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );

  }
  removeimage(name) {
    name = name + '.png';
    this.storecatservie.catimageRemove(name).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"] == true) {

          // this.imageURL=null;
          // Adding the timestamp parameter to image src
          this._toastrService.success(
            res['message'],
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          // this.addToast({ title: res['message'], timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

        }
      }
    );
  }

  changecat() {
    this.imageURL = null;
    this.Spinner2 = true;
    //console.log(this.selectedcat);
    let LUK_ID: number = this.categoryList.find(x => x.ID == this.selectedcat).LKP_ID;
    this.itemService.getsubcategories(LUK_ID).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.SUBcategoryList = res['subcategories'];
          console.log(this.SUBcategoryList);
          this.Spinner2 = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }
  // private cloneOptions(options: Array<IOption>): Array<IOption> {
  //   return options.map(option => ({ value: option.value, label: option.label }));
  // }
  imageURL = null;

  savemaincatimage() {
    const formData = new FormData();
    if (this.files.length > 0) {
      this.spinnerSave = true;
      //console.log(this.files);
      formData.append("file", this.files[0], this.selectedcat + ".png");
      formData.append("token", localStorage.getItem('token'));
      this.storecatservie.catimagechange(formData).subscribe(
        (res: JSON) => {
          //console.log(res);
          if (res["status"] == true) {
            formData.delete;
            this.files = [];
            this.spinnerSave = false;
            this._toastrService.success(
              'DONE',
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
            // this.imageURL=null;
            // Adding the timestamp parameter to image src
            // this.addToast({ title: "DONE", timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

          }
        }
      );
    } else {
      this._toastrService.error(
        'Somthing Wrong',
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      // this.addToast({ title: 'ُSomthing Wrong', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return;
    }
  }
  savesubcatimage(index) {
    if (this.SUBcategoryList[index].ImageToUpload != null && this.SUBcategoryList[index].ImageToUpload != undefined) {
      this.spinnerselectedinded = index;
      const formData = new FormData();
      formData.append("file", this.SUBcategoryList[index].ImageToUpload, this.SUBcategoryList[index].ID + ".png");
      formData.append("token", localStorage.getItem('token'));
      this.storecatservie.catimagechange(formData).subscribe(
        (res: JSON) => {
          if (res["status"] == true) {
            formData.delete;
            this.SUBcategoryList[index].ImageToUpload = null;
            // this.SUBcategoryList[index].ImageToShow=null;
            this.spinnerselectedinded = null;
            // this.addToast({ title: "DONE", timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            this._toastrService.success(
              'DONE',
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
          }
        }
      );
    } else {
      this._toastrService.error(
        'Must Choose Image To Change',
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      // this.addToast({ title: "Must Choose Image To Change", timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }


}
