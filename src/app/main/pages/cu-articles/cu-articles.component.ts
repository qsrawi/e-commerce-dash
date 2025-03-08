import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterService } from 'app/Shared/Services/newletterservice/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cu-articles',
  templateUrl: './cu-articles.component.html',
  styleUrls: ['./cu-articles.component.scss'],

})
export class cu_articlesComponent implements OnInit {
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
  articles: any = {type:'article',description:''};
  imagePath: string = '';

  position = 'top-right';
  proceessing = false;
  passwordemail: string = '';
  templetetosend: any = null;
  spinnerSave = false;
  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });
  
  constructor(private changeDetectorRef: ChangeDetectorRef,private arouter: ActivatedRoute,private router: Router, private articlesservice: NewsletterService, private _toastrService: ToastrService,) {
    if (localStorage.getItem('accessToken') == null) {
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.arouter.params.subscribe(params => {
      if(+params['id']==0){
        this.articles = {type:'article',description:''};
        this.Spinner = false;
      }else{
        this.getnews(+params['id'])

      }
    });
    
  }
  
  getnews(id) {
    this.articlesservice.whytochoosedetails(id).subscribe((res: any) => {
      console.log(res);

      this.articles = res;
      console.log(this.articles );
      
      this.Spinner = false;
    })

  }

  onFileChange(event) {
    this.imagePath = event.target.files[0];
    this.uploadattach();

  }

  ngOnInit() {

  }


rrer(){

  return `<app-tinymce [(ngModel)]='articles.decription' #tinymce='tinymce'></app-tinymce>`;
}


  save() {
    this.proceessing = true;


    if (this.imagePath != '') {


    } else {
      this._toastrService.error(
        "Error",
        'You must fill image',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    }
    this.articlesservice.insertwhy(this.articles).subscribe((res: JSON) => {
      if (res['msg'] == true) {
        if (this.imagePath != '') {
          // this.articles.imagePath = this.imagePath['name'];
          this.imagePath = '';
        }
        this.articles=res['why'];
        this.router.navigate(['./articles']);
        // if (this.articles.id == null) {
        //   this.articleslist.unshift(res['why']);
        // }

        this.proceessing = false;
        this._toastrService.success(
          "Done",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });
  }

  uploadattach() {
    const formData = new FormData();
      if (this.imagePath != '') {
        this.articles.attachment = this.imagePath['name'];
        formData.append("file", this.imagePath, this.imagePath['name']);
      }
      this.articlesservice.uploadfile(formData).subscribe((res: JSON) => {
        if (res['status'] == true) { 
          formData.delete;

        }
      });
  }
}
