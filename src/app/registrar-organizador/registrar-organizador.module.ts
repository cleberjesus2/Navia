import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarOrganizadorPageRoutingModule } from './registrar-organizador-routing.module';

import { RegistrarOrganizadorPage } from './registrar-organizador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarOrganizadorPageRoutingModule
  ],
  declarations: [RegistrarOrganizadorPage]
})
export class RegistrarOrganizadorPageModule {}
