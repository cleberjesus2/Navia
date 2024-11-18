import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OleonaturalPageRoutingModule } from './oleonatural-routing.module';

import { OleonaturalPage } from './oleonatural.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OleonaturalPageRoutingModule
  ],
  declarations: [OleonaturalPage]
})
export class OleonaturalPageModule {}
