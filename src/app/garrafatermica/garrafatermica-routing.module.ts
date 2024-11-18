import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GarrafatermicaPage } from './garrafatermica.page';

const routes: Routes = [
  {
    path: '',
    component: GarrafatermicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarrafatermicaPageRoutingModule {}
