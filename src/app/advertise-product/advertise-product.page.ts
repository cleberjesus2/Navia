import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular'; // Importando ToastController
import { ServiceProviderService } from '../service-provider.service'; // Importando o ServiceProviderService

@Component({
  selector: 'app-advertise-product',
  templateUrl: './advertise-product.page.html',
  styleUrls: ['./advertise-product.page.scss'],
})
export class AdvertiseProductPage {
  productName: string = '';
  productDescription: string = '';
  productPrice: number = 0;
  productStock: number = 0;
  productCategory: string = '';
  sellerCpfCnpj: string = '';
  sellerPhone: string = '';
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private serviceProvider: ServiceProviderService // Injetando o ServiceProviderService
  ) {}

  // Método para capturar o arquivo selecionado
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Método para exibir notificações ao usuário
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Tempo em milissegundos que o toast ficará visível
      position: 'bottom', // Posição do toast (pode ser 'top', 'middle', 'bottom')
      color: color, // Cor do toast (ex.: 'success', 'danger', 'warning')
    });
    toast.present();
  }

  // Método para anunciar o produto com validação do organizador
  advertiseProduct() {
    const usuarioId = 1; // Substitua pelo ID do usuário logado (obtenha dinamicamente, se necessário)

    // Verificar se o usuário é um organizador aprovado
    this.serviceProvider.verificarOrganizador(usuarioId).subscribe(
      (res: any) => {
        if (res.status === 'aprovado') {
          const formData = new FormData();
          formData.append('name', this.productName);
          formData.append('description', this.productDescription);
          formData.append('price', this.productPrice.toString());
          formData.append('stock', this.productStock.toString());
          formData.append('category', this.productCategory);
          formData.append('cpfCnpj', this.sellerCpfCnpj);
          formData.append('telefone', this.sellerPhone);

          if (this.selectedFile) {
            formData.append('image', this.selectedFile, this.selectedFile.name);
          }

          this.http.post('http://localhost/app/add_product.php', formData).subscribe(
            async (response: any) => {
              if (response.status === 'sucesso') {
                await this.presentToast('Produto anunciado com sucesso!'); // Mostra o toast de sucesso
              } else {
                await this.presentToast('Erro ao anunciar produto: ' + response.mensagem, 'danger'); // Mostra o toast de erro
              }
            },
            async (error) => {
              console.error('Erro ao enviar dados', error);
              await this.presentToast('Erro ao anunciar produto', 'danger'); // Mostra o toast de erro
            }
          );
        } else {
          this.presentToast('Você precisa ser um organizador aprovado para anunciar produtos.', 'danger');
        }
      },
      (error) => {
        console.error('Erro ao verificar organizador', error);
        this.presentToast('Erro ao verificar o status de organizador.', 'danger');
      }
    );
  }
}
