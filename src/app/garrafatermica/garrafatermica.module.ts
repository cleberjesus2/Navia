import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GarrafatermicaPageRoutingModule } from './garrafatermica-routing.module';

import { GarrafatermicaPage } from './garrafatermica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GarrafatermicaPageRoutingModule
  ],
  declarations: [GarrafatermicaPage]
})
export class GarrafatermicaPageModule {}
