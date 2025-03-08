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
  templateUrl: './items-image.component.html',
  styleUrls: ['./items-image.component.scss']
})
export class ItemsImageComponent implements OnInit {
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
  imagetodelete: JSON;
  imageList: JSON[] = [];
  images: Image[] = [
    // new Image(44545656452, { img: 'assets/images/light-box/l1.jpg' }),
    // new Image(44545656453, { img: 'assets/images/light-box/l5.jpg' }),
    // new Image(44545656454, { img: 'assets/images/light-box/l6.jpg' }),
    // new Image(44545656455, { img: 'assets/images/light-box/l4.jpg' }),
    // new Image(44545656456, { img: 'assets/images/light-box/l5.jpg' }),
    // new Image(44545656457, { img: 'assets/images/light-box/l6.jpg' })
  ];
  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '150px', height: '150px' }, { length: 12, wrap: true })
  };
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));

  public demoForm = new FormGroup({
    files: this.filesControl
  });
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
          this.inititemimage();
        }
        //  this.showorderdetinit();

      }
    });
  }

  ngOnInit() {
  }
  inititemimage() {
    //console.log(this.itemid);
    this.itemService.getitemBYid(this.itemid).subscribe(
      (res: JSON) => {
        console.log(res);
        if (res["status"]) {
          this.item = res['item'];
          this.imageList = res['images'];
          // res['images'].forEach(img => {
          //   this.images.push(new Image(img['ID'], { img: '../itemimage/' + img['ImagePath'] }),);
          // });
          // //console.log(this.images);
          this.Spinner = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }
  deleteimage(event, img) {
    //console.log("deleteimage");
    this.imagetodelete = img;
    //console.log(this.imagetodelete);
    this.openuploadimagemodal(event);
    // document.querySelector('#' + event).classList.add('md-show');
  }
  savedecription(img) {
    this.itemService.savedecription(img).subscribe(
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
      }
    );
  }
  openuploadimagemodal(event) {
    //console.log(subcat);
    this.modalService.open(event, {
      centered: true,
      size: 'md'
    });
    // document.querySelector('#' + event).classList.add('md-show');
  }


  deleteafterconfirm() {
    this.itemService.deletefile(this.imagetodelete['ImagePath'], this.imagetodelete['ID']).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          // this.router.navigate(['./orderdet/'+this.neworderid]);
          // img['modal']['img'].substring(img['modal']['img'].lastIndexOf('/')+1);          
          let index = this.imageList.findIndex(s => s['ID'] == this.imagetodelete['ID']);
          this.imageList.splice(index, 1);
          this.modalService.dismissAll();
          // document.querySelector('#' + 'modal-delete').classList.remove('md-show');
          // this.addToast({title:"تمت العملية بنجاح", timeout: 5000, theme:'default', position:'top-left', type:'success'});

        } else {
          // this.addToast({title:"هناك خطأ ما", timeout: 5000, theme:'default', position:'top-left', type:'error'});
        }
      }
    );

  }
  MakeSelected(index: number) {
    //console.log("MakeSelected");
    this.imageList.forEach(img => {
      img['isdefault'] = false;
    });
    this.itemService.makeimageselected(this.imageList[index]['ID'], this.imageList[index]['ItemID']).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          this.imageList[index]['isdefault'] = true;
        } else {
          // this.addToast({title:"هناك خطأ ما", timeout: 5000, theme:'default', position:'top-left', type:'error'});
        }
      }
    );
  }
  imagesUpload() {
    this.toggleStatus();
    //console.log(this.demoForm.value);
    // let listofitemimage:JSON[]=[];
    //console.log(this.demoForm.value['files']);
    const formData = new FormData();
    for (let i = 0; i < this.demoForm.value['files'].length; i++) {
      formData.append("images", this.demoForm.value['files'][i]['name']);

      formData.append("files", this.demoForm.value['files'][i], this.demoForm.value['files'][i]['name']);
    }
    // formData.append("files", this.demoForm.value);
    formData.append("token", localStorage.getItem('token'));
    formData.append("ItemID", this.itemid.toString());


    //console.log(formData);

    this.itemService.addimages(formData).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"] == true) {
          formData.delete;
          this.imageList = res['images'];
          this.toggleStatus();
          // this.files=[];
          // this.imageURL='';
          // this.Spinner=false;
          //   this.addToast({title:"تم اضافة الصورة بنجاح", timeout: 5000, theme:'default', position:'top-left', type:'success'});
        }
      }
    );
  }

  public toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }

}
