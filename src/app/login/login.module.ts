import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { IonicStorageModule } from '@ionic/storage-angular';  // Importe o IonicStorageModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    IonicStorageModule.forRoot()  // Configure o IonicStorageModule aqui
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}

