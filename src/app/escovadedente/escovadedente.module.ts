import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscovadedentePageRoutingModule } from './escovadedente-routing.module';

import { EscovadedentePage } from './escovadedente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscovadedentePageRoutingModule
  ],
  declarations: [EscovadedentePage]
})
export class EscovadedentePageModule {}
