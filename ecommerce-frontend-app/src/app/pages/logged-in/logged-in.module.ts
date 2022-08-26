import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoggedInRoutingModule } from './logged-in-routing.module';
import { LoggedInComponent } from './logged-in.component';


@NgModule({
  declarations: [
    LoggedInComponent,
  ],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    SharedModule
  ]
})
export class LoggedInModule { }
