import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtensilioscozinhaPageRoutingModule } from './utensilioscozinha-routing.module';

import { UtensilioscozinhaPage } from './utensilioscozinha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtensilioscozinhaPageRoutingModule
  ],
  declarations: [UtensilioscozinhaPage]
})
export class UtensilioscozinhaPageModule {}
