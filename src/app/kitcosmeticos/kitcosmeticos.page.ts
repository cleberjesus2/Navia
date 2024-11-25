import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController } from '@ionic/angular';
import { style } from '@angular/animations';

interface DadosCompra {
  nomeCompleto: string;
  cpf: string;
  cnpj?: string; // CNPJ é opcional
  endereco: string;
  telefone: string;
  email: string;
}

@Component({
  selector: 'app-kitcosmeticos',
  templateUrl: './kitcosmeticos.page.html',
  styleUrls: ['./kitcosmeticos.page.scss'],
})
export class KitcosmeticosPage implements OnInit  {

  produto: any; // Definindo a variável produto
  showToast: boolean = false; // Variável para controlar a exibição do toast
  toastMessage: string = ''; // Mensagem do toast

  constructor(private http: HttpClient, private toastController: ToastController, private alertController: AlertController) { 
    // Inicializando o objeto produto
    this.produto = {
      nome: 'Kit de Cosméticos',
      preco: '25,00',
      descricao: 'Produtos dermatologicamente testados',
    };
  }

  ngOnInit() {
    // Aqui você pode fazer outras inicializações se necessário
  }

  async mostrarFormularioCompra() {
    const alert = await this.alertController.create({
      header: 'Confirmar Compra',
      inputs: [
        {
          name: 'nomeCompleto',
          type: 'text',
          placeholder: 'Nome Completo',
          cssClass: 'custom-input' // Adiciona uma classe personalizada
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF',
          cssClass: 'custom-input'
        },
        {
          name: 'cnpj',
          type: 'text',
          placeholder: 'CNPJ (Opcional)',
          cssClass: 'custom-input'
        },
        {
          name: 'endereco',
          type: 'text',
          placeholder: 'Endereço',
          cssClass: 'custom-input'
        },
        {
          name: 'telefone',
          type: 'tel',
          placeholder: 'Telefone',
          cssClass: 'custom-input'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          cssClass: 'custom-input'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Compra cancelada');
          }
        },
        {
          text: 'Confirmar Compra',
          handler: (data: DadosCompra) => {
            console.log('Dados capturados:', data); // Depuração
            this.confirmarCompra(data);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmarCompra(dados: DadosCompra) {
    const dadosCompra = {
      nomeCompleto: dados.nomeCompleto,
      cpf: dados.cpf,
      cnpj: dados.cnpj,
      endereco: dados.endereco,
      telefone: dados.telefone,
      email: dados.email,
      produto: this.produto
    };

    this.http.post('http://localhost/app/comprar_produto.php', dadosCompra)
      .subscribe(response => {
        this.presentToast('Compra confirmada!', 'success');
      }, error => {
        this.presentToast('Erro ao confirmar compra.', 'danger');
        console.error(error);
      });
  }

  adicionarAoCarrinho() {
    // Lógica para adicionar o produto ao carrinho
    console.log(`${this.produto.nome} foi adicionado ao carrinho!`);
    
    // Exibir o toast
    this.toastMessage = `${this.produto.nome} foi adicionado ao carrinho!`;
    this.showToast = true;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
