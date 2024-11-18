import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServiceProviderService } from '../service-provider.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  produtos: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private serviceProvider: ServiceProviderService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.serviceProvider.getProducts().subscribe(
      (response: any) => {
        if (response.status === 'sucesso') {
          this.produtos = response.produtos;
        } else {
          alert('Erro ao carregar produtos');
        }
      },
      (error: any) => {
        console.error('Erro ao carregar produtos', error);
        alert('Erro na requisição de produtos');
      }
    );
  }

  rotateAndNavigate(productId: number, event: any) {
    const pageMap: Record<number, string> = {
      1: '/escovadedente',
      2: '/kitcosmeticos',
      3: '/garrafatermica',   
      4: '/copos',
      5: '/ecobag',
      6: '/utensilioscozinha',
      7: '/sacola',
      8: '/oleonatural'   // Adicione outros mapeamentos conforme necessário
    };

    const page = pageMap[productId];
    if (!page) {
      console.error(`Rota não encontrada para o produto ID ${productId}`);
      return;
    }

    const cardElement = event.currentTarget.closest('ion-card');
    cardElement.classList.add('rotate');

    setTimeout(() => {
      cardElement.classList.remove('rotate');
      this.router.navigate([page]);
    }, 1000); // Atraso para a animação (1000ms = 1s)
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
            this.navCtrl.navigateRoot('/login');
          },
        },
      ],
    });

    await alert.present();
  }
}
