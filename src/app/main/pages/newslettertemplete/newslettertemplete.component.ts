import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsLetter, newsLetterinit } from 'app/Shared/Model/newsletter';
import { NewsletterService } from 'app/Shared/Services/newletterservice/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newslettertemplete',
  templateUrl: './newslettertemplete.component.html',
  styleUrls: ['./newslettertemplete.component.scss']
})
export class NewslettertempleteComponent implements OnInit {
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
  newsletter: NewsLetter = newsLetterinit;
  imagePath: string = ''; position = 'top-right';
  newsletterlist: NewsLetter[] = [];
  showeditmode = false;
  proceessing = false;
  passwordemail: string = '';
  templetetosend: NewsLetter = null;
  spinnerSave = false;
  typesoption: any[] = [];

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
      this.newsletter = newsLetterinit;
    }
  }
  gettype(typeid) {
    // console.log(this.typesoption);
    // console.log(typeid);

    return this.typesoption.find(x => x.ID == typeid).type;
  }
  getnews() {
    this.newsletterservice.getall().subscribe((res: any) => {
      //console.log(res);

      this.newsletterlist = res['news'];
      this.newsletterlist.forEach(element => {
        if (typeof element.typeId === 'number') {
          element.typeId = element.typeId + '';
        }
      });
      this.typesoption = res['types'];
      // console.log(this.typesoption);

      // for (let i = 0; i < res['types'].length; i++) {
      //   this.typesoption.push({ value: res['types'][i]['ID'] + '', label: res['types'][i]['type'] });
      // }
      // this.typesoption = this.cloneOptions(this.typesoption);
      this.Spinner = false;
    })
  }
  // private cloneOptions(options: Array<IOption>): Array<IOption> {
  //   return options.map(option => ({ value: option.value, label: option.label }));
  // }
  onFileChange(event, index) {
    //console.log(index);
    //console.log("onFileChange");
    this.imagePath = event.target.files[0];
  }
  ngOnInit() {

  }

  deletetemplete(id: number, ind) {
    //console.log(id);
    this.newsletterservice.deletetemplete(id).subscribe((res: boolean) => {
      this.newsletterlist.splice(ind, 1);
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    })
  }

  sendtoall(tempid: number) {
    this.spinnerSave = true;
    //console.log("sendtoall");
    this.newsletterservice.sendtoall(tempid, this.passwordemail).subscribe((res: JSON) => {
      if (res['status'] == true)
        this._toastrService.success(
          res['msg'],
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      // this.addToast({ title: res['msg'], timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      else
        this._toastrService.error(
          res['msg'],
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      // this.addToast({ title: res['msg'], timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      this.spinnerSave = false;
      document.querySelector('#modal-pass').classList.remove('md-show');
    });
  }
  openMyModal(event, templetetosend) {
    console.log("aslkdmaslkdmas");

    this.templetetosend = templetetosend;
    this.modalService.open(event, {
      centered: true,
      size: 'md'
    });
    // document.querySelector('#' + event).classList.add('md-show');
  }
  // closeMyModal(event) {
  //   ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  // }
  save() {
    this.proceessing = true;
    const formData = new FormData();
    formData.append("type", 'temp');
    if (this.imagePath != '') {
      this.newsletter.imagepath = this.imagePath['name'];
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
          this.newsletter.imagepath = this.imagePath['name'];
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
