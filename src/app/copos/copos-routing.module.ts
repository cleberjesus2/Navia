import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoposPage } from './copos.page';

const routes: Routes = [
  {
    path: '',
    component: CoposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoposPageRoutingModule {}
