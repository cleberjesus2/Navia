import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcobagPageRoutingModule } from './ecobag-routing.module';

import { EcobagPage } from './ecobag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcobagPageRoutingModule
  ],
  declarations: [EcobagPage]
})
export class EcobagPageModule {}
