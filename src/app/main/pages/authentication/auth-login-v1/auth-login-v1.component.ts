import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login-v1',
  templateUrl: './auth-login-v1.component.html',
  styleUrls: ['./auth-login-v1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV1Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public submitted = false;
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   * @param {ToastrService} _toastrService
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: UntypedFormBuilder,
    private _authenticationService: AuthenticationService, private _toastrService: ToastrService, private router: Router
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  public loading = false;
  // dashboard/ecommerce
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("erorrrrrrrrrrrrrrr");

      return;
    } else {
      this.loading = true;

      this._authenticationService.Login
        (this.loginForm.value)
        .subscribe(c => {
          console.log(c);
          if (c["accessToken"]) {
            console.log(c["accessToken"]);
            localStorage.setItem("accessToken", c["accessToken"]);
            let a= '/slider';
            this.router.navigate([a]);

            // this._authenticationService.redirectUserBasedRole();
          } else if (!c["accessToken"]) {
            this._toastrService.error(
              c["msg"],
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
          }
          this.loading = false;

        },
          err => {
            if (err.status == 400) {
              //console.log(err);
              this._toastrService.error(
                err.error.message,
                '',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );

              this.loading = false;

              // alert(err.error.message);
            }
          });
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      UserName: ['', [Validators.required]],
      Password: ['', Validators.required]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }



  // login() {
  //   this.authserverService.Login
  //     (this.LoginForm.value)
  //     .subscribe(c => {
  //       //console.log(c);
  //       if (c["accessToken"]) {
  //         //console.log(c["accessToken"]);
  //         localStorage.setItem("accessToken", c["accessToken"]);
  //         this.authenticationService.redirectUserBasedRole();
  //       } else if(!c["accessToken"]){
  //         alert(c["msg"]);
  //       }
  //     },
  //       err => {
  //         if (err.status == 400) {
  //           //console.log(err);
  //           alert(err.error.message);
  //         }
  //       });
  // }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
