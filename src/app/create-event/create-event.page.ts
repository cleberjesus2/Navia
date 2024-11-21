import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceProviderService } from '../service-provider.service'; // Importando ServiceProviderService

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage {
  evento = {
    titulo: '',
    descricao: '',
    data_hora: '',
    local: '',
    categoria: '',
    cpf_cnpj: '',
    telefone: '',
    numero_segurancas: 2
  };

  constructor(private serviceProvider: ServiceProviderService, private router: Router, private toastController: ToastController) {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  eventoImagem: File | null = null; // Para armazenar o arquivo de imagem

  // Método para capturar o arquivo selecionado
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.eventoImagem = file;
    }
  }
  
  saveEvent() {
    console.log('Dados do evento a serem enviados:', this.evento);
  
    if (this.evento.titulo && this.evento.descricao && this.evento.data_hora && this.evento.local && this.evento.categoria && this.evento.cpf_cnpj && this.evento.telefone && this.evento.numero_segurancas >= 2) {
      const formData = new FormData();
  
      // Adicionando os campos do evento ao FormData
      for (const key in this.evento) {
        if (Object.prototype.hasOwnProperty.call(this.evento, key)) {
          formData.append(key, this.evento[key as keyof typeof this.evento] as string | Blob);
        }
      }
  
      // Adicionando a imagem, se houver
      if (this.eventoImagem) {
        formData.append('imagem', this.eventoImagem);
      }
  
      this.serviceProvider.addEvento(formData).subscribe(
        (response: any) => {
          console.log('Resposta ao salvar evento:', response);  // Adicione esse log
          if (response.status === 'sucesso') {
            this.presentToast('Evento anunciado com sucesso!', 'success');
            this.router.navigate(['/tabs/tab1']); // Redireciona para tabs1
          } else {
            this.presentToast('Erro ao anunciar evento: ' + response.mensagem, 'danger');
          }
        },
        error => {
          console.error('Erro ao enviar dados', error);
          this.presentToast('Erro ao anunciar evento', 'danger');
        }
      );
    } else {
      this.presentToast('Todos os campos obrigatórios devem ser preenchidos.', 'danger');
    }
  }
  
}
