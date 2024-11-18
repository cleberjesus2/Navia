import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  advertiseProduct() {
    const productData = {
      name: this.productName,
      description: this.productDescription,
      price: this.productPrice,
      stock: this.productStock,
      category: this.productCategory,
      cpfCnpj: this.sellerCpfCnpj,
      telefone: this.sellerPhone,
      // No need to send the image in this example. You'll need additional handling for file uploads.
    };

    this.http.post('http://localhost/app/add_product.php', productData)
      .subscribe((response: any) => {
        if (response.status === 'sucesso') {
          alert('Produto anunciado com sucesso!');
        } else {
          alert('Erro ao anunciar produto: ' + response.mensagem);
        }
      }, error => {
        console.error('Erro ao enviar dados', error);
        alert('Erro ao anunciar produto');
      });
  }
}
