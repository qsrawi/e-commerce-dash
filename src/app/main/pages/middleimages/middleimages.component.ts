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
  selector: 'app-middleimages',
  templateUrl: './middleimages.component.html',
  styleUrls: ['./middleimages.component.scss']
})
export class MiddleimagesComponent implements OnInit {
/**
   * Emitted Events
   *
   * @param $event
   * @param {ToastrService} _toastrService
  
   */
emittedEvents($event) {
  console.log('Action : ', $event);
}
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
  constructor(private modalService: NgbModal,private domSanitizer: DomSanitizer, private router: Router, private _toastrService: ToastrService, private sliderService: SliderService) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.getallmiddleimages();
  }

  ngOnInit() {
  }

  init() {
  }
  getallmiddleimages() {
    this.sliderService.getallmiddileimagesMIDDLE().subscribe(
      (res: JSON) => {
        console.log(res);
        if (res["status"]) {
          for (let i = 0; i < res['images'].length; i++) {            
            this.images.push(new Image(i, { img: this.transform('http://192.119.110.192:5001/middleimages/' + res['images'][i]) }));
          }
          this.Spinner=false;
        } else {
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

      formData.append("file", this.files[0], this.files[0]['name']);
      formData.append("token", localStorage.getItem('token'));

      this.sliderService.addfilesMIDDLE(formData).subscribe(
        (res: JSON) => {
          //console.log(res);
          if (res["status"] == true) {
            formData.delete;
            this.images.unshift(new Image(this.images.length, { img: this.transform('http://192.119.110.192:5001/middleimages/' + this.files[0]['name']) }));
            this.files = [];
            this.imageURL = '';
            this.Spinner = false;
            this._toastrService.success(
              "Done Successfully" ,
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
            // this.addToast({ title: "Done Successfully", timeout: 5000, theme: 'default', position: 'top-left', type: 'success' });
          }
        }
      );
    } else {
      this._toastrService.error(
        "Please Choose a Photo to Add..." ,
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      return;
    }
  }

  opensendmodal(event, img) {
    console.log(img);
    
    this.idtodelete = img.id;
    //console.log(img);

    this.imagetodelete = img['modal']['img']['changingThisBreaksApplicationSecurity'].substring(img['modal']['img']['changingThisBreaksApplicationSecurity'].lastIndexOf('/') + 1);
    //console.log(this.imagetodelete);
    this.modalService.open(event, {
      centered: true,
      size: 'md'
    });
    // document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  deleteafterconfirm() {
    console.log(this.images);

    this.sliderService.deletefileMIDDLE(this.imagetodelete).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {

          let index = this.images.findIndex(s => s['id'] == this.idtodelete);
          console.log(index);
          console.log(this.idtodelete);
          
          this.images.splice(index, 1);
          this.modalService.dismissAll();
          // document.querySelector('#' + 'modal-delete').classList.remove('md-show');
          this._toastrService.success(
            "Done Successfully" ,
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          // this.addToast({ title: "Done Successfully", timeout: 5000, theme: 'default', position: 'top-left', type: 'success' });

        } else {
          this._toastrService.error(
            "Somthing Wrong" ,
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          // this.addToast({ title: "Somthing Wrong", timeout: 5000, theme: 'default', position: 'top-left', type: 'error' });
        }
      }
    );

  }

}
