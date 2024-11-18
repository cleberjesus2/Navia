import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtensilioscozinhaPage } from './utensilioscozinha.page';

const routes: Routes = [
  {
    path: '',
    component: UtensilioscozinhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtensilioscozinhaPageRoutingModule {}
