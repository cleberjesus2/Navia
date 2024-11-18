import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KitcosmeticosPageRoutingModule } from './kitcosmeticos-routing.module';

import { KitcosmeticosPage } from './kitcosmeticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KitcosmeticosPageRoutingModule
  ],
  declarations: [KitcosmeticosPage]
})
export class KitcosmeticosPageModule {}
