import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertiseProductPage } from './advertise-product.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertiseProductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdvertiseProductPage]
})
export class AdvertiseProductPageModule { }
