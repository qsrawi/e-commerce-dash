import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterService } from 'app/Shared/Services/newletterservice/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],

})
export class articlesComponent implements OnInit {
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
  articleslist: any[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef,private router: Router, private articlesservice: NewsletterService, private _toastrService: ToastrService,) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }

    this.getnews()
  }
  editmode(news) {

    this.router.navigate(['./articles/'+news.id]);

  }
  addnewmode() {

    this.router.navigate(['./articles/0']);

  }
  getnews() {
    this.articlesservice.getallwhytoChooseecommerce('article').subscribe((res: any[]) => {
      //console.log(res);

      this.articleslist = res;
      this.Spinner = false;
    })

  }



  ngOnInit() {

  }

  deletearticles(id: number, ind) {
    //console.log(id);
    this.articlesservice.deletewhytochoose(id).subscribe((res: boolean) => {
      this.articleslist.splice(ind, 1);
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
  //   this.articlesservice.insertwhy(this.articles).subscribe((res: JSON) => {
  //     if (res['msg'] == true) {
  //       if (this.imagePath != '') {
  //         this.articles.imagePath = this.imagePath['name'];
  //         this.imagePath = '';
  //       }
  //       if (this.articles.id == null) {
  //         this.articleslist.unshift(res['why']);
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
  //       this.articles.attachment = this.imagePath['name'];
  //       formData.append("file", this.imagePath, this.imagePath['name']);
  //     }
  //     this.articlesservice.uploadfile(formData).subscribe((res: JSON) => {
  //       if (res['status'] == true) { 
  //         formData.delete;

  //       }
  //     });
  //   }
  // }
}
