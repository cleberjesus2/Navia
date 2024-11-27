import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ServiceProviderService } from '../service-provider.service'; // Corrigido para usar seu ServiceProviderService

@Component({
  selector: 'app-registrar-organizador',
  templateUrl: './registrar-organizador.page.html',
  styleUrls: ['./registrar-organizador.page.scss'],
})
export class RegistrarOrganizadorPage {
  organizador = {
    nome: '',
    telefone: '',
    cpf: '',
    numero_residencial: '',
    cargo: '',               // Adicionando a propriedade 'cargo'
    empresa: '',             // Adicionando a propriedade 'empresa'
    documento_empresa: '',  // Adicionando a propriedade 'documento_empresa'
    area_atuacao: '',        // Adicionando a propriedade 'area_atuacao'
    descricao: ''            // Adicionando a propriedade 'descricao'
  };

  constructor(private toastController: ToastController, private serviceProvider: ServiceProviderService) {}

  async registrarOrganizador() {
    console.log('Função registrarOrganizador chamada');

    // Verificar se os campos estão preenchidos
    if (!this.organizador.nome || !this.organizador.telefone || !this.organizador.cpf || !this.organizador.numero_residencial
      || !this.organizador.cargo || !this.organizador.empresa || !this.organizador.documento_empresa || !this.organizador.area_atuacao || !this.organizador.descricao) {
      console.log('Campos incompletos, exibindo Toast');
      const toast = await this.toastController.create({
        message: 'Erro: Dados incompletos.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    // Supondo que você tenha uma propriedade `diasAtivos` para o usuário
    const diasAtivos = 15; // Substitua pelo valor correto, obtido do backend ou localStorage

    // Verificar se o usuário tem pelo menos 20 dias ativos
    if (diasAtivos < 20) {
      console.log('O usuário não tem dias ativos suficientes');
      const toast = await this.toastController.create({
        message: 'Erro: Você precisa ter pelo menos 20 dias ativos para ser um organizador.',
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    console.log('Dados do organizador:', this.organizador);

    // Usando o ServiceProviderService para enviar os dados ao backend
    this.serviceProvider.registrarOrganizador(this.organizador).subscribe(
      (response: any) => {
        // Sucesso no registro
        const toast = this.toastController.create({
          message: 'Organizador registrado com sucesso!',
          duration: 2000,
          color: 'success'
        });
        toast.then(toast => toast.present());
      },
      (error: any) => {
        // Erro ao registrar
        const toast = this.toastController.create({
          message: 'Erro ao registrar organizador.',
          duration: 3000,
          color: 'danger'
        });
        toast.then(toast => toast.present());
      }
    );
  }
}
