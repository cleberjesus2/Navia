import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscovadedentePage } from './escovadedente.page';

const routes: Routes = [
  {
    path: '',
    component: EscovadedentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscovadedentePageRoutingModule {}
