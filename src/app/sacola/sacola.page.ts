import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController } from '@ionic/angular';

interface DadosCompra {
  nomeCompleto: string;
  cpf: string;
  cnpj?: string; // CNPJ é opcional
  endereco: string;
  telefone: string;
  email: string;
}

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.page.html',
  styleUrls: ['./sacola.page.scss'],
})
export class SacolaPage implements OnInit  {

  produto: any; // Definindo a variável produto
  showToast: boolean = false; // Variável para controlar a exibição do toast
  toastMessage: string = ''; // Mensagem do toast

  constructor(private http: HttpClient, private toastController: ToastController, private alertController: AlertController) { 
    // Inicializando o objeto produto
    this.produto = {
      nome: 'Sacola',
      preco: '3,00',
      descricao: 'Sacola Sustentável',
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
          attributes: {
            required: true,
          }
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF',
          attributes: {
            required: true,
          }
        },
        {
          name: 'cnpj',
          type: 'text',
          placeholder: 'CNPJ',
        },
        {
          name: 'endereco',
          type: 'text',
          placeholder: 'Endereço',
          attributes: {
            required: true,
          }
        },
        {
          name: 'telefone',
          type: 'tel',
          placeholder: 'Telefone',
          attributes: {
            required: true,
          }
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          attributes: {
            required: true,
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar Compra',
          handler: (data: DadosCompra) => {
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
