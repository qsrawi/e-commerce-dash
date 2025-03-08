import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderService } from 'app/Shared/Services/slider/slider.service';
import { StoresandcategoriesService } from 'app/Shared/Services/sotresandcategories/storesandcategories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quantity-and-appearance',
  templateUrl: './quantity-and-appearance.component.html',
  styleUrls: ['./quantity-and-appearance.component.scss']
})
export class QuantityAndAppearanceComponent implements OnInit {
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
  currentstart: Number = null;
  // savestart = false;
  stores: JSON[] = [];
  constructor(private router: Router, private sliderService: SliderService, private store: StoresandcategoriesService, private _toastrService: ToastrService) {
    if (localStorage.getItem('accessToken') == null) {
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
        this.stores = ss['stores'];
        this.Spinner = false;
      }
    );
  }
  start(index) {
    this.currentstart = index;
    this.store.startquantityandappearance(this.stores[index]['StoreID']).subscribe((res: boolean) => {
      if (res) {
        this._toastrService.success(
          'Done for ' + this.stores[index]['StoreEnName'] + ' ...',
          '',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
        // this.addToast({ title: 'Done for '+this.stores[index]['StoreEnName'] +' ...', timeout: 5000, theme: 'default', position: 'top-left', type: 'success' });
        this.currentstart = null;
      }
    });

  }
  ngOnInit() {
  }
}
