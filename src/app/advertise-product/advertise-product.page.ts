import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular'; // Importando ToastController

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

  constructor(private http: HttpClient, private toastController: ToastController) {} // Injetando ToastController

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Tempo em milissegundos que o toast ficará visível
      position: 'bottom', // Posição do toast (pode ser 'top', 'middle', 'bottom')
      color: 'success', // Você pode usar 'success', 'danger', 'warning', etc.
    });
    toast.present();
  }

  advertiseProduct() {
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

    this.http.post('http://localhost/app/add_product.php', formData)
      .subscribe(async (response: any) => {
        if (response.status === 'sucesso') {
          await this.presentToast('Produto anunciado com sucesso!'); // Mostra o toast de sucesso
        } else {
          await this.presentToast('Erro ao anunciar produto: ' + response.mensagem); // Mostra o toast de erro
        }
      }, async error => {
        console.error('Erro ao enviar dados', error);
        await this.presentToast('Erro ao anunciar produto'); // Mostra o toast de erro
      });
  }
}