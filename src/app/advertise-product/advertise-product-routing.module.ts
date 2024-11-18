import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertiseProductPage } from './advertise-product.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertiseProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiseProductPageRoutingModule {}
