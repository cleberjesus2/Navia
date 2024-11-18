import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcobagPage } from './ecobag.page';

const routes: Routes = [
  {
    path: '',
    component: EcobagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcobagPageRoutingModule {}
