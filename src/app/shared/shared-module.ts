import { NgModule } from '@angular/core';

import { MaterialModule } from './material-module';

import { ReactiveFormsModule } from '@angular/forms';
import { Utils } from './services/utils';
import { CommonModule } from '@angular/common';




@NgModule({

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  exports: [MaterialModule,  ReactiveFormsModule,CommonModule,],
  providers:[Utils]
})
export class SharedModule { }
