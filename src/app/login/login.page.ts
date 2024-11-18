import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../service-provider.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private serviceProvider: ServiceProviderService,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController // Injeta o ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Garante que o Storage está pronto para uso
  }

  // Função para exibir o toast
  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem, // Mensagem do toast
      duration: 2000, // Duração em milissegundos (2 segundos)
      position: 'bottom', // Posição do toast (top, middle ou bottom)
      color: 'danger' // Cor do toast
    });
    await toast.present();
  }

  async login() {
    if (this.email && this.senha) {
      try {
        const response: any = await this.serviceProvider.login(this.email, this.senha).toPromise();

        if (response.status === 'sucesso') {
          // Salva o user_id, userName e userEmail no Storage
          await this.storage.set('user_id', response.user_id);
          await this.storage.set('userName', response.userName);
          await this.storage.set('userEmail', response.userEmail);
          console.log('Dados do usuário salvos:', response);

          this.router.navigate(['/tabs']);
        } else {
          this.mostrarToast(response.mensagem); // Mostra toast em caso de erro
        }
      } catch (error) {
        console.error('Erro ao realizar login', error);
        this.mostrarToast('Erro na requisição de login. Tente novamente mais tarde.');
      }
    } else {
      this.mostrarToast('Por favor, preencha todos os campos.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
