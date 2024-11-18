import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  creators = [
    {
      name: 'Ana Paula Franco',
      role: 'Analista de Sistema',
      photo: 'assets/imagens/about/ana-paula.jpeg',
      description: 'Analista do Sistema e documentação',
    },
    {
      name: 'Cleber Jesus',
      role: 'Desenvolvedor',
      photo: 'assets/imagens/about/cleber-jesus.jpeg',
      description: 'Desenvolvimento do Back e Front-end do App ',
    },
    {
      name: 'Pedro Julio',
      role: 'Designer UI/UX',
      photo: 'assets/imagens/about/pedro-julio.jpeg',
      description: 'Planejou e organizou as experiências do usuario',
    },
    {
      name: 'Ana Souza',
      role: 'Desenvolvedora Frontend',
      photo: 'assets/images/ana.jpg',
      description: 'Implementou as interfaces do usuário e integrou as funcionalidades do app.',
    },
    {
      name: 'Rafael Mendes',
      role: 'Especialista em Sustentabilidade',
      photo: 'assets/images/rafael.jpg',
      description: 'Forneceu insights e conteúdo sobre práticas sustentáveis e ecológicas.',
    },
  ];
}
