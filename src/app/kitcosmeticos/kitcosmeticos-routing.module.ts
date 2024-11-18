import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KitcosmeticosPage } from './kitcosmeticos.page';

const routes: Routes = [
  {
    path: '',
    component: KitcosmeticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KitcosmeticosPageRoutingModule {}
