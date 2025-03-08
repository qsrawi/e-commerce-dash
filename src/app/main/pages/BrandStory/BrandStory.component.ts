import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterService } from 'app/Shared/Services/newletterservice/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-BrandStory',
  templateUrl: './BrandStory.component.html',
  styleUrls: ['./BrandStory.component.scss'],

})
export class BrandStoryComponent implements OnInit {
  /**
   * Emitted Events
   *
   * @param $event
   * @param {ToastrService} _toastrService
  
   */
  // emittedEvents($event) {
  //   console.log('Action : ', $event);
  // }
  Spinner: boolean = true;

  position = 'top-right';
  BrandStorylist: any[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef,private router: Router, private BrandStoryservice: NewsletterService, private _toastrService: ToastrService,) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }

    this.getnews()
  }
  editmode(news) {

    this.router.navigate(['./BrandStory/'+news.id]);

  }
  addnewmode() {

    this.router.navigate(['./BrandStory/0']);

  }
  getnews() {
    this.BrandStoryservice.getallwhytoChooseecommerce('BrandStory').subscribe((res: any[]) => {
      //console.log(res);

      this.BrandStorylist = res;
      this.Spinner = false;
    })

  }



  ngOnInit() {

  }

  deleteBrandStory(id: number, ind) {
    //console.log(id);
    this.BrandStoryservice.deletewhytochoose(id).subscribe((res: boolean) => {
      this.BrandStorylist.splice(ind, 1);
      this._toastrService.success(
        "Done",
        '',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    })
  }



  // save() {
  //   this.proceessing = true;


  //   if (this.imagePath != '') {


  //   } else {
  //     this._toastrService.error(
  //       "Error",
  //       'You must fill image',
  //       { toastClass: 'toast ngx-toastr', closeButton: true }
  //     );
  //   }
  //   this.BrandStoryservice.insertwhy(this.BrandStory).subscribe((res: JSON) => {
  //     if (res['msg'] == true) {
  //       if (this.imagePath != '') {
  //         this.BrandStory.imagePath = this.imagePath['name'];
  //         this.imagePath = '';
  //       }
  //       if (this.BrandStory.id == null) {
  //         this.BrandStorylist.unshift(res['why']);
  //       }

  //       this.proceessing = false;
  //       this._toastrService.success(
  //         "Done",
  //         '',
  //         { toastClass: 'toast ngx-toastr', closeButton: true }
  //       );
  //     }
  //   });
  // }

  // uploadattach(type) {
  //   if (type == 'img') {
  //     const formData = new FormData();
  //     if (this.imagePath != '') {
  //       this.BrandStory.attachment = this.imagePath['name'];
  //       formData.append("file", this.imagePath, this.imagePath['name']);
  //     }
  //     this.BrandStoryservice.uploadfile(formData).subscribe((res: JSON) => {
  //       if (res['status'] == true) { 
  //         formData.delete;

  //       }
  //     });
  //   }
  // }
}
