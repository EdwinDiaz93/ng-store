import { NgModule } from '@angular/core';

import { MaterialModule } from './material-module';
import { NgxPaginationModule } from 'ngx-pagination'
import { ReactiveFormsModule } from '@angular/forms';
import { Utils } from './services/utils';
import { CommonModule } from '@angular/common';




@NgModule({

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [MaterialModule, ReactiveFormsModule, CommonModule, NgxPaginationModule],
  providers: [Utils]
})
export class SharedModule { }
