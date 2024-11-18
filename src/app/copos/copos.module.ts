import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoposPageRoutingModule } from './copos-routing.module';

import { CoposPage } from './copos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoposPageRoutingModule
  ],
  declarations: [CoposPage]
})
export class CoposPageModule {}
