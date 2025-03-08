import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-storeestimated-date',
  templateUrl: './storeestimated-date.component.html',
  styleUrls: ['./storeestimated-date.component.scss']
})
export class StoreestimatedDateComponent implements OnInit {
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
  position = 'top-right';
  savestart = false;
  stores:JSON[]=[];
  constructor(private router:Router, private _toastrService: ToastrService,private store:StoresandcategoriesService) {
    if(localStorage.getItem('accessToken')==null){
      this.router.navigate(['/pages/authentication/login-v1']);
      //console.log("null Token .... ");
      return;
    }
    this.get();

  }
  get() {
    this.Spinner = true;
    this.store.getstores().subscribe(
      (ss: any) => {
        this.stores=ss['stores'];
        this.Spinner = false;
      }
    );
  }
  savechanges() {
    this.savestart=true;
    this.store.savestore(this.stores).subscribe((res: boolean) => {
      if (res) {
        this._toastrService.success(
          "Done...",
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );        this.savestart=false;
      }

    });
  }
  ngOnInit() {
  }
}
