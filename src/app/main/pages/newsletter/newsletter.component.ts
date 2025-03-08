import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Newsletterecommerce, newsletterecommerceinit } from 'app/Shared/Model/newsletterecommerce';
import { NewsletterService } from 'app/Shared/Services/newletterservice/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  /**
   * Emitted Events
   *
   * @param $event
   * @param {ToastrService} _toastrService
  
   */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }
  Spinner: boolean = true;
  newsletter: Newsletterecommerce = newsletterecommerceinit;
  imagePath: string = ''; position = 'top-right';
  newsletterlist: Newsletterecommerce[] = [];
  showeditmode = false;
  proceessing = false;
  passwordemail: string = '';
  templetetosend: Newsletterecommerce = null;
  spinnerSave = false;
  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });
  constructor(private modalService: NgbModal, private router: Router, private newsletterservice: NewsletterService, private _toastrService: ToastrService,) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }

    this.getnews()
  }
  editmode(news) {
    this.showeditmode = true;
    this.newsletter = news;
  }
  addnewmode() {
    if (this.showeditmode == true) {
      this.showeditmode = false
    } else {
      this.showeditmode = true;
      this.newsletter = newsletterecommerceinit;
    }
  }
  getnews() {
    this.newsletterservice.getallnewsletterecommerce().subscribe((res: Newsletterecommerce[]) => {
      //console.log(res);

      this.newsletterlist = res;
      this.Spinner = false;
    })

  }
  openuploadimagemodal(event) {
    //console.log(subcat);
    this.modalService.open(event, {
      centered: true,
      size: 'lg'
    });
    // document.querySelector('#' + event).classList.add('md-show');
  }
  onFileChange(event, index) {
    //console.log(index);
    //console.log("onFileChange");
    this.imagePath = event.target.files[0];
  }
  ngOnInit() {

  }
  changestatudtoactive(id: number,) {
    //console.log(id);
    this.newsletterservice.setacctivestatus(id).subscribe((res: boolean) => {
      // this.newsletterlist.splice(ind, 1);
      this.newsletterlist.forEach(element => {
        if (element.ID != id) {
          element.active = false;
        }

      });
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      // this.addToast({ title: "Done", timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    })
  }
  deletetempleteecommerce(id: number, ind) {
    //console.log(id);
    this.newsletterservice.deletetempleteecommerce(id).subscribe((res: boolean) => {
      this.newsletterlist.splice(ind, 1);
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    })
  }

  sendtoall(tempid: number,qq) {
    this.spinnerSave = true;
    //console.log("sendtoall");
    this.newsletterservice.sendtoall(tempid, this.passwordemail).subscribe((res: JSON) => {
      if (res['status'] == true)
      this._toastrService.success(
        res['msg'],
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      else
      this._toastrService.error(
        res['msg'],
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
      this.spinnerSave = false;
      this.openuploadimagemodal(qq);
    });
  }
 
  save() {
    this.proceessing = true;

    const formData = new FormData();
    formData.append("type", 'eco');
    if (this.imagePath != '') {
      this.newsletter.imagePath = this.imagePath['name'];
      formData.append("file", this.imagePath, this.imagePath['name']);
      formData.append("news", JSON.stringify(this.newsletter));
    } else {
      formData.append("news", JSON.stringify(this.newsletter)
      );
    }
    this.newsletterservice.savechanges(formData).subscribe((res: JSON) => {
      if (res['msg'] == true) {
        formData.delete;
        if (this.imagePath != '') {
          this.newsletter.imagePath = this.imagePath['name'];
          this.imagePath = '';
        }
        if (this.newsletter.ID == null) {
          this.newsletterlist.unshift(res['newnews']);
        }

        this.showeditmode = false;
        this.proceessing = false;
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });
  }








}
