import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OleonaturalPage } from './oleonatural.page';

const routes: Routes = [
  {
    path: '',
    component: OleonaturalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OleonaturalPageRoutingModule {}
