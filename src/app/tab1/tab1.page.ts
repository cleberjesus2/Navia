import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServiceProviderService } from '../service-provider.service';

interface Evento {
  nome: string;
  descricao: string;
  imagem: string;
  data: string;
  endereco: string;
  categoria: string; // Corrigido para ser uma string normal
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  eventosColeta: Evento[] = [];
  eventosReciclagem: Evento[] = [];
  eventosTroca: Evento[] = [];
  eventosPalestras: Evento[] = [];
  eventosFeira: Evento[] = [];

  filteredEventos: Evento[] = [];

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private serviceProvider: ServiceProviderService
  ) {}

  // Função de confirmação para logout
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

  // Navegar para o evento
  verEvento(evento: Evento) {
    this.navCtrl.navigateForward(`/evento/${evento.nome}`);
  }

  // Carregar eventos dinâmicos
  ionViewWillEnter() {
    this.loadEventosDinamicos();
  }

  // Função para filtrar os eventos
  filterEventos(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredEventos = [
      ...this.eventosColeta,
      ...this.eventosReciclagem,
      ...this.eventosTroca,
      ...this.eventosPalestras,
      ...this.eventosFeira,
    ].filter(
      (evento) =>
        evento.nome.toLowerCase().includes(searchText) ||
        evento.descricao.toLowerCase().includes(searchText) ||
        evento.endereco.toLowerCase().includes(searchText)
    );
  }

  // Função para carregar eventos
  loadEventosDinamicos() {
    this.serviceProvider.getEventos().subscribe(
      (data: Evento[]) => {
        console.log('Dados dos eventos recebidos:', data);
        this.filteredEventos = data; // Atribua diretamente para ver se os dados aparecem
      },
      (error) => {
        console.error('Erro ao carregar eventos', error);
      }
    );
  }
  
}