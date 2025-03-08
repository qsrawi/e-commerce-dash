import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterService } from 'app/Shared/Services/newletterservice/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class youtubeComponent implements OnInit {
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
  youtube: any = {type:'youtube'};
  imagePath: string = '';
  attPath: string = '';

  position = 'top-right';
  youtubelist: any[] = [];
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
  constructor(private router: Router, private youtubeservice: NewsletterService, private _toastrService: ToastrService,) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }

    this.getnews()
  }
  editmode(news) {
    this.showeditmode = true;
    this.youtube = news;
  }
  addnewmode() {
    if (this.showeditmode == true) {
      this.showeditmode = false
    } else {
      this.showeditmode = true;
      this.youtube = {type:'youtube'};
    }
  }
  getnews() {
    this.youtubeservice.getallwhytoChooseecommerce('youtube').subscribe((res: any[]) => {
      //console.log(res);

      this.youtubelist = res;
      this.Spinner = false;
    })

  }

  // onFileChange(event, index) {
  //   this.imagePath = event.target.files[0];
  //   this.uploadattach('img');

  // }
  // onFileChangeatt(event, index) {
  //   this.attPath = event.target.files[0];
  //   this.uploadattach('att');
  // }
  ngOnInit() {

  }

  deleteyoutube(id: number, ind) {
    //console.log(id);
    this.youtubeservice.deletewhytochoose(id).subscribe((res: boolean) => {
      this.youtubelist.splice(ind, 1);
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    })
  }



  save() {
    this.proceessing = true;
    if (this.youtube.attachment != '') {


    } else {
      this._toastrService.error(
        "Error",
        'You must fill all things',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    }
    this.youtubeservice.insertwhy(this.youtube).subscribe((res: JSON) => {
      if (res['msg'] == true) {
    
        if (this.youtube.id == null) {
          this.youtubelist.unshift(res['why']);
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

  // uploadattach(type) {
  //   if (type == 'img') {
  //     const formData = new FormData();
  //     if (this.imagePath != '') {
  //       this.youtube.attachment = this.imagePath['name'];
  //       formData.append("file", this.imagePath, this.imagePath['name']);
  //     }
  //     this.youtubeservice.uploadfile(formData).subscribe((res: JSON) => {
  //       if (res['status'] == true) {
  //         formData.delete;

  //       }
  //     });
  //   } else {
  //     const formData = new FormData();
  //     if (this.attPath != '') {
  //       this.youtube.description = this.attPath['name'];
  //       formData.append("file", this.attPath, this.attPath['name']);
  //     }
  //     this.youtubeservice.uploadfile(formData).subscribe((res: JSON) => {
  //       if (res['status'] == true) {
  //         formData.delete;

  //       }
  //     });
  //   }


  // }
}
