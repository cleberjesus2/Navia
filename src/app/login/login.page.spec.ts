import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../service-provider.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

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
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Garante que o Storage está pronto para uso
  }

  async login() {
    if (this.email && this.senha) {
      try {
        const response: any = await this.serviceProvider.login(this.email, this.senha).toPromise();

        if (response.status === 'sucesso') {
          // Salva o user_id, userName, userEmail e userPhone no Storage
          await this.storage.set('user_id', response.user_id);
          await this.storage.set('userName', response.userName);
          await this.storage.set('userEmail', response.userEmail);
          await this.storage.set('userPhone', response.userPhone);
          console.log('Dados do usuário salvos:', response);

          this.router.navigate(['/tabs']);
        } else {
          alert(response.mensagem);
        }
      } catch (error) {
        console.error('Erro ao realizar login', error);
        alert('Erro na requisição de login');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
