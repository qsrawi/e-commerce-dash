import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { Description, DescriptionStrategy, Image } from '@ks89/angular-modal-gallery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderService } from 'app/Shared/Services/slider/slider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-slider-manager',
  templateUrl: './slider-manager.component.html',
  styleUrls: ['./slider-manager.component.scss']
})
export class SliderManagerComponent implements OnInit {

  /**
   * Emitted Events
   *
   * @param $event
   * @param {ToastrService} _toastrService
  
   */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  storesList: JSON[];
  categoryList: JSON[];
  slecetedStore = null;
  slecetedCategory = null;
  description = '';
  header = '';
  url = '';

  // new ......
  orderslist: JSON[];
  Spinner = true;
  ShowHideArr: boolean[] = [true, true, true, true];
  orderidtosend;
  position = 'top-left';
  orderidtodelete;
  imagetodelete;
  idtodelete;
  images: Image[] = [
  ]
  singleImage: Image[] = [this.images[0]];

  customFullDescriptionHidden: Description = {
    strategy: DescriptionStrategy.ALWAYS_HIDDEN,
    customFullDescription: 'Custom description of the current visible image'
  };

  imageURL: string;

  files: string[] = [];
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  public demoForm = new FormGroup({
    files: this.filesControl
  });



  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });
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
  constructor(private modalService: NgbModal, private domSanitizer: DomSanitizer, private router: Router, private _toastrService: ToastrService, private sliderService: SliderService) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);

      // this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.getallslides();
  }

  ngOnInit() {
  }
  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  init() {
    this.sliderService.getall().subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.storesList = res['stores'];
          this.Spinner = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }
  getallslides() {
    this.sliderService.getallslides().subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          for (let i = 0; i < res['images'].length; i++) {
            console.log('http://192.119.110.192:5001/sliderimage/' + res['images'][i]['RecordNote']);
            
            this.images.push(new Image(res['images'][i]['ID'], { img: this.transform('http://192.119.110.192:5001/sliderimage/' + res['images'][i]['RecordNote']) ,extUrl:'http://192.119.110.192:5001/sliderimage/' + res['images'][i]['RecordNote']}));
          }
          // this.orderslist=res["orders"];
          // //console.log(this.orderslist);
          this.init();
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  addnewphoto() {

    const formData = new FormData();

    if (this.files.length > 0) {
      this.Spinner = true;

      //console.log(this.files);

      formData.append("file",   this.files[0], this.files[0]['name']);
      formData.append("token", localStorage.getItem('token'));
      formData.append("description", this.description);
      formData.append("header", this.header); 
      formData.append("url", this.url);

      this.sliderService.addfiles(formData).subscribe(
        (res: JSON) => {
          //console.log(res);
          if (res["status"] == true) {
            formData.delete;
            this.images.unshift(new Image(this.images.length, { img: 'http://192.119.110.192:5001/sliderimage/' + this.files[0]['name'],extUrl:'http://192.119.110.192:5001/sliderimage/' + this.files[0]['name'] }));
            this.files = [];
            this.imageURL = '';
            this.description = '';
            this.header = '';
            this.url = '';
            this.Spinner = false;
            this._toastrService.success(
              "تم اضافة الصورة بنجاح",
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
            // this.addToast({title:"تم اضافة الصورة بنجاح", timeout: 5000, theme:'default', position:'top-left', type:'success'});
          }
        }
      );
    } else {
      this._toastrService.error(
        "يرجى اختيار صورة لاضافتها",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      return;
    }
  }

  storechange() {

    //console.log(this.slecetedStore);
    this.sliderService.getStoreCategories(this.slecetedStore).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.categoryList = res['categories'];
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );

  }
  opensendmodal(event, img) {
    this.idtodelete = img.id;
    //console.log(img);

    this.imagetodelete = img['modal']['img']['changingThisBreaksApplicationSecurity'].substring(img['modal']['img']['changingThisBreaksApplicationSecurity'].lastIndexOf('/') + 1);
    //console.log(this.imagetodelete);
    this.modalService.open(event, {
      centered: true,
      size: 'md'
    });
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  deleteafterconfirm() {
    this.sliderService.deletefile(this.idtodelete, this.imagetodelete).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          //console.log(this.images);

          let index = this.images.findIndex(s => s['modal']['img'].toString().substring(s['modal']['img'].toString().lastIndexOf('/') + 1) == this.imagetodelete);
          this.images.splice(index, 1);
          this.modalService.dismissAll();
          this._toastrService.success(
            "تم العملية بنجاح",
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          // this.addToast({ title: "تمت العملية بنجاح", timeout: 5000, theme: 'default', position: 'top-left', type: 'success' });

        } else {
          this._toastrService.error(
            "هناك خطأ ما",
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          // this.addToast({ title: "هناك خطأ ما", timeout: 5000, theme: 'default', position: 'top-left', type: 'error' });
        }
      }
    );

  }


}
