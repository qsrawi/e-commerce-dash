import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { AuthLoginV1Component } from './auth-login-v1/auth-login-v1.component';

// routing
const routes: Routes = [
  {
    path: 'authentication/login-v1',
    component: AuthLoginV1Component,
    data: { animation: 'auth' }
  }
];

@NgModule({
  declarations: [AuthLoginV1Component],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}
