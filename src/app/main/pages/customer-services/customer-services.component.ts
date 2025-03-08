import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomerServices } from 'app/Shared/Model/CustomerServices';
import { CustomerserviceService } from 'app/Shared/Services/CustomerServices/customerservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.scss']
})
export class CustomerServicesComponent implements OnInit {
   /**
    * Emitted Events
    *
    * @param $event
    * @param {ToastrService} _toastrService
   
    */
   emittedEvents($event) {
    console.log('Action : ', $event);
  }
  CustomerServiceslist: CustomerServices[] = [];
  position = 'top-right';
  Spinner = true;

  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });
  constructor(private Cuteomerservice_service: CustomerserviceService,private router:Router,private _toastrService: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    if(localStorage.getItem('accessToken')==null){
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.getinit()

  }
  getinit() {
    this.Cuteomerservice_service.getall().subscribe((res: CustomerServices[]) => {
      //console.log(res);

      this.CustomerServiceslist = res;
      this.CustomerServiceslist.forEach(element => {
        element.imagetoubload = null;
        if(element.imagePath==null || element.imagePath==undefined || element.imagePath=='undefined' ){
          element.imagePath='';
        }
      });
      this.Spinner = false;
    });

  }
  ngOnInit() {
  }

  onFileChange(event, index) {
    //console.log(index);
    //console.log("onFileChange");

    this.CustomerServiceslist[index].imagetoubload = event.target.files[0];

    //console.log(this.CustomerServiceslist);

  }

  update(object, mindex) {
    //console.log(object);
    const formData = new FormData();

    if (object.imagetoubload!=null) {
      formData.append("file", object.imagetoubload, object.imagetoubload['name']);
      formData.append("image", object.imagetoubload['name']);
    }else{
      //console.log("elseeeeeeeeeeeeeeeeeeeeeeee");
      //console.log(object.imagePath);
      
      formData.append("image", object.imagePath);
    }
    formData.append("pageString", object.pageString);
    formData.append("id", object.ID);
    this.Cuteomerservice_service.savechanges(formData).subscribe((res: boolean) => {
      if (res == true) {
        formData.delete;
        if(object.imagetoubload!=null){
          this.CustomerServiceslist[mindex].imagePath = object.imagetoubload['name'];
          this.CustomerServiceslist[mindex].imagetoubload=null;
        }
        this._toastrService.success(
          'Done',
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }
    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
 

}
