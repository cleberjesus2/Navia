import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ServiceProviderService } from '../service-provider.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';

  constructor(
    private storage: Storage,
    private serviceProvider: ServiceProviderService,
    private navCtrl: NavController, // Adicionado
    private alertController: AlertController // Adicionado
  ) {}

  async ionViewWillEnter() {
    await this.storage.create();
    const user_id = await this.storage.get('user_id');
    this.userName = await this.storage.get('userName');
    this.userEmail = await this.storage.get('userEmail');
    this.userPhone = await this.storage.get('userPhone');
    console.log('User ID recuperado:', user_id);
    console.log('Phone:', this.userPhone); // Adicionado para depuração

    if (user_id) {
      this.serviceProvider.getUserProfile(user_id).subscribe(
        (response: any) => {
          if (response.status === 'sucesso') {
            this.userName = response.userName;
            this.userEmail = response.userEmail;
            this.userPhone = response.userPhone;
          } else {
            alert('Erro ao carregar dados do perfil');
          }
        },
        (error: any) => {
          console.error('Erro ao carregar perfil', error);
         
        }
      );
    } else {
      console.log('user_id não encontrado no Storage');
    }
  }

  async updateProfile() {
    const user_id = await this.storage.get('user_id');
    if (user_id) {
      this.serviceProvider.updateUserProfile(user_id, this.userName, this.userEmail, this.userPhone).subscribe(
        (response: any) => {
          if (response.status === 'sucesso') {
            alert('Dados atualizados com sucesso');
            console.log('Telefone atualizado:', this.userPhone); // Adicionado para depuração
          } else {
            alert('Erro ao atualizar dados');
          }
        },
        (error: any) => {
          console.error('Erro ao atualizar dados', error);
          alert('Erro na atualização dos dados');
        }
      );
    } else {
      console.log('user_id não encontrado no Storage');
    }
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza de que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Logout cancelado');
          },
        },
        {
          text: 'Sair',
          role: 'confirm',
          handler: () => {
            console.log('Saindo...');
            this.navCtrl.navigateRoot('/login'); // Redireciona para a página de login
          },
        },
      ],
    });

    await alert.present();
  }
}
