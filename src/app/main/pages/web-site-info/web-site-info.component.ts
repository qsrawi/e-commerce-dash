import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { WebSiteInfo, initweb } from 'app/Shared/Model/WebSiteInfo';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-web-site-info',
  templateUrl: './web-site-info.component.html',
  styleUrls: ['./web-site-info.component.scss']
})
export class WebSiteInfoComponent implements OnInit {
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
  websiteinfo: WebSiteInfo;
  position = 'top-right';
  imageurl: string = "http://192.119.110.192:5001/logo/logo.png";
  public basicContent: string;
  public Aboutus: string;
  public contactus: string;
  public scrollingNews: string;
  public GiftDescription: string;

  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  bforder;
  Aforder;
  Afamount;
  Afstatus;
  messageApiKey;
  public demoForm = new FormGroup({
    files: this.filesControl
  });
  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer,
    private service: StoresandcategoriesService,
    private _toastrService: ToastrService) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.websiteinfo = initweb;
    this.getwebsiteinfo()
  }

 












  ngOnInit() {
    this.basicContent = '<p>Hello...</p>';
  }
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  PrivacyPolicy: string;
  getwebsiteinfo() {
    this.service.getwebsiteinfo().subscribe((res: WebSiteInfo) => {
      this.websiteinfo = res;
      this.basicContent = this.websiteinfo.term;
      this.Aboutus = this.websiteinfo.aboutus;

      this.bforder = this.websiteinfo.message.substring(0, this.websiteinfo.message.indexOf("{ORDERID}"));
      this.Aforder = this.websiteinfo.message.substring(this.websiteinfo.message.indexOf("{ORDERID}") + "{ORDERID}".length, this.websiteinfo.message.indexOf("{AMOUNT}"));
      this.Afamount = this.websiteinfo.message.substring(this.websiteinfo.message.indexOf("{AMOUNT}") + "{AMOUNT}".length, this.websiteinfo.message.indexOf("{STATUSNAME}"));
      this.Afstatus = this.websiteinfo.message.substring(this.websiteinfo.message.indexOf("{STATUSNAME}") + "{STATUSNAME}".length, this.websiteinfo.message.length);
      this.messageApiKey = this.websiteinfo.messageApiKey;
      this.contactus = this.websiteinfo.contactus;
      this.scrollingNews = this.websiteinfo.scrollingNews;
      this.GiftDescription = this.websiteinfo.GiftDescription;

      this.PrivacyPolicy = this.websiteinfo.PrivacyPolicy;
      if (this.websiteinfo == null) {
        this.websiteinfo = initweb;
      }
      this.Spinner = false;
    });

  }

  savemessage() {
    let mees: string = `${this.bforder} {ORDERID} ${this.Aforder} {AMOUNT} ${this.Afamount} {STATUSNAME} ${this.Afstatus}`;
    this.service.updateMessage(mees, this.messageApiKey).subscribe((res: boolean) => {
      if (res == true) {
        // this.addToast({ title: "Done", timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }

    });
  }
  save() {
    this.Spinner = true;
    this.service.UPDATEwebsiteinfo(this.websiteinfo).subscribe((res: WebSiteInfo) => {
      this.websiteinfo = res;
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      ); this.Spinner = false;
    });
  }

  logochange() {
    this.toggleStatus();
    this.imageurl = "";
    const formData = new FormData();
    let type: string = this.demoForm.value['files'][0]['type'].split('/')[1];

    formData.append("file", this.demoForm.value['files'][0], 'logo.' + type);
    this.service.logochange(formData).subscribe(
      (res: JSON) => {
        //console.log(res);
        if (res["status"] == true) {
          formData.delete;
          // this.imageURL=this.demoForm.value['files'][0];

          this.imageurl = "http://192.119.110.192:5001/logo/logo.png";
          this.toggleStatus();
        }
      }
    );

  }
  public toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }

  Termschanges() {
    this.service.Termschanges(this.basicContent).subscribe((res: boolean) => {
      if (res == true) {
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }

    });
  }

  aboutuschanges() {
    this.service.aboutuschanges(this.Aboutus).subscribe((res: boolean) => {
      if (res == true) {
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }

    });
  }
  contactuschange() {
    this.service.contactuschange(this.contactus).subscribe((res: boolean) => {
      if (res == true) {
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });
  }
  PrivacyPolicychange() {
    this.service.PrivacyPolicychange(this.PrivacyPolicy).subscribe((res: boolean) => {
      if (res == true) {
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });
  }
  scrollingNewschange() {
    this.service.scrollingNewschange(this.scrollingNews).subscribe((res: boolean) => {
      if (res == true) {
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });
  }

  GiftDescriptionchange() {
    this.service.GiftDescriptionchange(this.GiftDescription).subscribe((res: boolean) => {
      if (res == true) {
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });
  }
  saveforgotPasswordService() {
    this.service.ForgotPasswordSevicechange(this.websiteinfo).subscribe((res: boolean) => {
      if (res == true) {
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });

  }


}
