import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Categorie from 'app/Shared/Model/category';
import Items from 'app/Shared/Model/item';
import { GridLayout, Image, PlainGalleryConfig, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';
import { Router } from '@angular/router';
import { ItemsServiceService } from 'app/Shared/Services/Items/items-service.service';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import * as XLSX from 'xlsx';
import DataFromExcel from 'app/Shared/Model/DataFromExcel';
type AOA = any[][];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
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
  // catoption: Array<IOption> = [];
  // SUBcatoption: Array<IOption> = [];
  // storeoption: Array<IOption> = [];
  selectedstore;
  storeCat: JSON[] = [];
  position = 'top-right';
  radiovalue = 'RelatedNo';
  upSpiner = false;
  SearchInput;
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
  // , FileUploadValidators.filesLimit(2)
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  private filesControlExcel = new FormControl(null, FileUploadValidators.filesLimit(2));

  public demoForm = new FormGroup({
    files: this.filesControl
  });
  public demoFormExcel = new FormGroup({
    files: this.filesControlExcel
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
  constructor(private modalService: NgbModal, private router: Router, private itemService: ItemsServiceService, private storecatservie: StoresandcategoriesService, private _toastrService: ToastrService) {
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
  openitemsdetails(itemid: number) {
    //console.log(itemid);

    // window.open('./itemsimage/'+itemid, '_blank');
    this.router.navigate(['./itemsdetails/' + itemid]);
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
          // for (let i = 0; i < this.SUBcategoryList.length; i++) {
          //   this.SUBcatoption.push({ value: this.SUBcategoryList[i].ID.toString(), label: this.SUBcategoryList[i].EnName });
          // }
          this.Spinner2 = false;
        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );


  }
  changerecomended(ItemID, val) {
    //console.log(val);
    this.itemService.updatevisabilty(ItemID, val).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {

        } else {
          this._toastrService.error(
            'Somthing Wrong',
            '',
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          // this.addToast({ title: 'Somthing Wrong', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' })
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
    this.ItemSpinner = true;
    this.itemsList = [];
    // this._toastrService.(
    //   'Somthing Wrong',
    //   '',
    //   { toastClass: 'toast ngx-toastr', closeButton: true }
    // );
    // this.addToast({ title: 'Updatting Table ', timeout: 800, theme: 'default', showClose: false, position: 'top-right', type: 'wait' })
    // this.openMyModal('modal-loadding');
    // this.tablespinner=true;
    let LUK_ID: number = this.categoryList.find(x => x.ID == this.selectedcat).LKP_ID;
    let SUB_LUK_ID: number = this.SUBcategoryList.find(x => x.ID == this.selectedSUBcat).LKP_ID;

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
          // document.querySelector('#modal-loadding').classList.remove('md-show');
          this.ItemSpinner = false;
        } else {
          this.ItemSpinner = false;
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );
  }
  openuploadimagemodal(event) {
    //console.log(subcat);
    this.modalService.open(event, {
      centered: true,
      size: 'lg'
    });
    // document.querySelector('#' + event).classList.add('md-show');
  }
  loadmoreitem() {
    // this.addToast({ title: 'Updatting Table ', timeout: 800, theme: 'default', showClose: false, position: 'top-right', type: 'wait' })
    // this.openMyModal('modal-loadding');
    // this.tablespinner=true;
    let LUK_ID: number = this.categoryList.find(x => x.ID == this.selectedcat).LKP_ID;
    let SUB_LUK_ID: number = this.SUBcategoryList.find(x => x.ID == this.selectedSUBcat).LKP_ID;

    this.itemService.getitems(LUK_ID, SUB_LUK_ID, this.itemsList.length).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"]) {
          let newitems: Items[] = res['items'];
          newitems.forEach(it => {
            this.itemsList.unshift(it);
          });
          // this.itemsList = res['items'];
          // if (this.getted == false) {
          //   this.next1();
          //   this.getted = true;
          // }
          // this.tablespinner=false;
          document.querySelector('#modal-loadding').classList.remove('md-show');

        } else {
          //console.log("هناك خطأ ما...");
          //this.addToast({title:'هناك خطأ ما', timeout: 5000, theme:'default', position:'top-left', type:'error'})
        }
      }
    );

  }

  // openMyModal(event) {
  //   document.querySelector('#' + event).classList.add('md-show');
  // }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  onItemChangeRadio(val) {
    //console.log(val);
    this.radiovalue = val;
  }

  up() {
    this.upSpiner = true;
    this.toggleStatus();
    console.log("asdasdasdasdasdasdasdas");

    for (let x = 0; x < this.itemsList.length; x++) {
      const formData = new FormData();
      let fileslist: any[] = [];
      fileslist = this.demoForm.value['files'].filter(a => {
        return a['name'].toString().includes(this.itemsList[x][this.radiovalue + '']);
      });
      if (fileslist != undefined && fileslist.length > 0) {
        for (let i = 0; i < fileslist.length; i++) {
          formData.append("images", fileslist[i]['name']);
          formData.append("files", fileslist[i], fileslist[i]['name']);
        }
        formData.append("ItemID", this.itemsList[x].ItemID.toString());
        this.itemService.addimages(formData).subscribe(
          (res: JSON) => {
            if (res["status"] == true) {
              formData.delete;
              this._toastrService.success(
                'Done For item : ' + this.itemsList[x].ItemEnName,
                '',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
              // this.addToast({ title: 'Done For item : ' + this.itemsList[x].ItemEnName, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' })

            }
          }
        );
      }
    }
    this.toggleStatus();
    this.upSpiner = false;

    // const formData = new FormData();
    // for (let i = 0; i < this.demoForm.value['files'].length; i++) {
    //   formData.append("images", this.demoForm.value['files'][i]['name']);

    //   formData.append("files", this.demoForm.value['files'][i], this.demoForm.value['files'][i]['name']);
    // }
    // formData.append("ItemID", this.itemid.toString());
    // //console.log(formData);
    // this.itemService.addimages(formData).subscribe(
    //   (res: JSON) => {
    //     //console.log(res);
    //     if (res["status"] == true) {
    //       formData.delete;
    //       this.toggleStatus();
    //     }
    //   }
    // );
  }
  upSpinerExcel = false;
  data: AOA = [[1, 2], [3, 4]];
  DataFromExcelList: DataFromExcel[] = [];
  uptoex() {
    this.DataFromExcelList = [];
    let ImageURLIndex: number;
    let BarcodeIndex: number;
    this.upSpinerExcel = true;
    this.toggleStatusExcel();
    console.log("asdasdasdasdasdasdasdas");
    const target: DataTransfer = <DataTransfer>(this.demoFormExcel.value);
    console.log(target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
      ImageURLIndex = this.data[0].findIndex(a => a == "image_url");
      BarcodeIndex = this.data[0].findIndex(a => a == "ean");
      for (let i = 1; i < this.data.length; i++) {
        if (this.data[i][BarcodeIndex] != "(blank)" && this.data[i][ImageURLIndex] != "(blank)" && this.data[i][BarcodeIndex] != null && this.data[i][ImageURLIndex] != null)
          this.DataFromExcelList.push(new DataFromExcel(this.data[i][BarcodeIndex], this.data[i][ImageURLIndex]));
      }
      console.log(this.DataFromExcelList);
      this.itemService.itemImagesFromExcel(this.DataFromExcelList).subscribe(
        (res: JSON) => {
          if (res["status"] == true) {
            this._toastrService.success(
              'Done',
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
            this.toggleStatusExcel();
            this.upSpinerExcel = false;
            this.modalService.dismissAll();
          } else {
            this.toggleStatusExcel();
            this.upSpinerExcel = false;
          }
        }
      );

    };
    reader.readAsBinaryString(target.files[0]);




    // for (let x = 0; x < this.itemsList.length; x++) {
    //   const formData = new FormData();
    //   let fileslist: any[] = [];
    //   fileslist = this.demoForm.value['files'].filter(a => {
    //     return a['name'].toString().includes(this.itemsList[x][this.radiovalue + '']);
    //   });
    //   if (fileslist != undefined && fileslist.length > 0) {
    //     for (let i = 0; i < fileslist.length; i++) {
    //       formData.append("images", fileslist[i]['name']);
    //       formData.append("files", fileslist[i], fileslist[i]['name']);
    //     }
    //     formData.append("ItemID", this.itemsList[x].ItemID.toString());
    //     this.itemService.addimages(formData).subscribe(
    //       (res: JSON) => {
    //         if (res["status"] == true) {
    //           formData.delete;
    //           this._toastrService.success(
    //             'Done For item : ' + this.itemsList[x].ItemEnName,
    //             '',
    //             { toastClass: 'toast ngx-toastr', closeButton: true }
    //           );
    //           // this.addToast({ title: 'Done For item : ' + this.itemsList[x].ItemEnName, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' })

    //         }
    //       }
    //     );
    //   }
    // }


    // const formData = new FormData();
    // for (let i = 0; i < this.demoForm.value['files'].length; i++) {
    //   formData.append("images", this.demoForm.value['files'][i]['name']);

    //   formData.append("files", this.demoForm.value['files'][i], this.demoForm.value['files'][i]['name']);
    // }
    // formData.append("ItemID", this.itemid.toString());
    // //console.log(formData);
    // this.itemService.addimages(formData).subscribe(
    //   (res: JSON) => {
    //     //console.log(res);
    //     if (res["status"] == true) {
    //       formData.delete;
    //       this.toggleStatus();
    //     }
    //   }
    // );
  }
  public toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }


  public toggleStatusExcel() {
    this.filesControlExcel.disabled ? this.filesControlExcel.enable() : this.filesControlExcel.disable();
  }

  downloadpoloimages() {

    this.itemService.getpoloparcodes().subscribe(
      (res: JSON[]) => {
        console.log(res);
        let bars: JSON[] = res;
        let xmlstring = `<ZETIC_F_RESIM>
        <IT_EAN>`;
        //4997
        for (let i = 0; i < bars.length; i++) {
          xmlstring = xmlstring +
            `<item>
          <EAN11>${bars[i]['Barcode']}</EAN11>
        </item>`;
          xmlstring = xmlstring +
            `</IT_EAN>
              <IT_MARKA>
                <item>
                  <MARKA>08</MARKA>
                </item>
              </IT_MARKA>
            </ZETIC_F_RESIM>`;
          this.itemService.getxmlpoloimages(xmlstring).subscribe((res: any) => {
            console.log(res);
            for (let j = 0; j < 4; j++) {
              let parser = new DOMParser();

              let doc = parser.parseFromString(res, "application/xml");

              let x = doc.getElementsByTagName("IMG1")[j];
              var y = x.childNodes[0].nodeValue;
              // console.log(y);
              let url = y;
              this.toDataURL(url, (dataUrl) => {
                this.downloadimage(dataUrl, bars[i]['Barcode'] + '_' + j);
              });
            }
          });

          xmlstring = `<ZETIC_F_RESIM>
          <IT_EAN>`;
        }

        // console.log(xmlstring);


        // let ressfake = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        // <ZETIC_F_RESIM>
        //     <ET_RESIM>
        //         <item>
        //             <PRODUCTCODE>50203216-VR046</PRODUCTCODE>
        //             <EAN11>8681896179807</EAN11>
        //             <IMG1>http://resim.aydinli.com.tr/08/1/016/L50203216VR046-1.jpg</IMG1>
        //             <IMG2>http://resim.aydinli.com.tr/08/1/016/L50203216VR046-2.jpg</IMG2>
        //             <IMG3>http://resim.aydinli.com.tr/08/1/016/L50203216VR046-3.jpg</IMG3>
        //             <IMG4>http://resim.aydinli.com.tr/08/1/016/L50203216VR046-4.jpg</IMG4>
        //         </item>
        //     </ET_RESIM>
        //     <E_MESSAGE/>
        // </ZETIC_F_RESIM>`;


        // window.open(y);
        // var url = 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
        // window.open(url);

      }
    );
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  downloadimage(base, filename) {
    console.log(base);
    let byteCharacters = atob(base.split(',')[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);

    let blob = new Blob([byteArray], { "type": "image/jpeg" });

    // if (navigator.msSaveBlob) {
    //   let filename = 'picture';
    //   navigator.msSaveBlob(blob, filename);
    // } else {
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.setAttribute('visibility', 'hidden');
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // }
  }

}
