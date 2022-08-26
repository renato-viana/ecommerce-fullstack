import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfirmationRoutingModule } from './confirmation-routing.module';
import { ConfirmationComponent } from './confirmation.component';


@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    ConfirmationRoutingModule
  ]
})
export class ConfirmationModule { }
