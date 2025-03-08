import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterService } from 'app/Shared/Services/newletterservice/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-whytoChoose',
  templateUrl: './whytoChoose.component.html',
  styleUrls: ['./whytoChoose.component.scss']
})
export class whytoChooseComponent implements OnInit {
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
  whytoChoose: any = {};
  imagePath: string = '';
  attPath: string = '';

  position = 'top-right';
  whytoChooselist: any[] = [];
  showeditmode = false;
  proceessing = false;
  passwordemail: string = '';
  templetetosend: any = null;
  spinnerSave = false;
  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });
  uploadFormatt = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });
  constructor(private router: Router, private whytoChooseservice: NewsletterService, private _toastrService: ToastrService,) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }

    this.getnews()
  }
  editmode(news) {
    this.showeditmode = true;
    this.whytoChoose = news;
  }
  addnewmode() {
    if (this.showeditmode == true) {
      this.showeditmode = false
    } else {
      this.showeditmode = true;
      this.whytoChoose = {};
    }
  }
  getnews() {
    this.whytoChooseservice.getallwhytoChooseecommerce('why').subscribe((res: any[]) => {
      //console.log(res);

      this.whytoChooselist = res;
      this.Spinner = false;
    })

  }

  onFileChange(event, index) {
    this.imagePath = event.target.files[0];
    this.uploadattach('img');

  }
  onFileChangeatt(event, index) {
    this.attPath = event.target.files[0];
    this.uploadattach('att');
  }
  ngOnInit() {

  }

  deletewhytochoose(id: number, ind) {
    //console.log(id);
    this.whytoChooseservice.deletewhytochoose(id).subscribe((res: boolean) => {
      this.whytoChooselist.splice(ind, 1);
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    })
  }



  save() {
    this.proceessing = true;

    let obj = {
      attachment: '',
      description: '',
      type: 'why'
    };
    if (this.imagePath != '' && this.attPath != '') {
      obj = {
        attachment: this.imagePath['name'],
        description: this.attPath['name'],

        type: 'why'
      };

    } else {
      this._toastrService.error(
        "Error",
        'You must fill all things',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    }
    this.whytoChooseservice.insertwhy(obj).subscribe((res: JSON) => {
      if (res['msg'] == true) {
        if (this.imagePath != '') {
          this.whytoChoose.imagePath = this.imagePath['name'];
          this.whytoChoose.description = this.attPath['name'];
          this.imagePath = '';
        }
        if (this.whytoChoose.id == null) {
          this.whytoChooselist.unshift(res['why']);
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

  uploadattach(type) {
    if (type == 'img') {
      const formData = new FormData();
      if (this.imagePath != '') {
        this.whytoChoose.attachment = this.imagePath['name'];
        formData.append("file", this.imagePath, this.imagePath['name']);
      }
      this.whytoChooseservice.uploadfile(formData).subscribe((res: JSON) => {
        if (res['status'] == true) {
          formData.delete;

        }
      });
    } else {
      const formData = new FormData();
      if (this.attPath != '') {
        this.whytoChoose.description = this.attPath['name'];
        formData.append("file", this.attPath, this.attPath['name']);
      }
      this.whytoChooseservice.uploadfile(formData).subscribe((res: JSON) => {
        if (res['status'] == true) {
          formData.delete;

        }
      });
    }


  }
}
