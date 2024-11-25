import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceProviderService } from '../service-provider.service'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nome: string = '';
  telefone: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private navCtrl: NavController, private serviceProvider: ServiceProviderService, private toastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom', 
      color: 'light'
    });
    await toast.present();
  }

  register() {
    if (this.senha !== this.confirmarSenha) {
      this.presentToast('As senhas não coincidem');
      return;
    }
  
    // Verificar se todos os campos estão preenchidos
    if (!this.nome || !this.telefone || !this.email || !this.senha) {
      this.presentToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    const postData = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      senha: this.senha
    };
  
    this.serviceProvider.register(postData).subscribe(
      response => {
        console.log(response);
        if (response.status === "sucesso") {
          this.presentToast('Registro realizado com sucesso!');
      
        } else {
          this.presentToast(response.mensagem);
        }
      },
      error => {
        console.error('Erro na requisição', error);
        if (error.error) {
          // Se houver uma resposta de erro do servidor
          console.error('Resposta do servidor:', error.error);
          this.presentToast(error.error.mensagem || 'Erro ao registrar usuário');
        } else {
          this.presentToast('Erro ao registrar usuário');
        }
      }
    );
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}