import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirecionamento para a tela de login ao acessar a raiz
    pathMatch: 'full',
  },
  {
    path: 'login', // Rota para a página de login
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register', // Rota para a página de registro
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs', // Rota para as tabs, a tela principal após o login
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'about', // Rota para a página "Sobre o App"
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
 
  {
    path: 'advertise-product', // Rota para a página de anunciar produto
    loadChildren: () => import('./advertise-product/advertise-product.module').then(m => m.AdvertiseProductPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: 'terms', // Rota para a página de Termos de Uso
    loadChildren: () => import('./terms/terms.module').then(m => m.TermsPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'escovadedente',
    loadChildren: () => import('./escovadedente/escovadedente.module').then( m => m.EscovadedentePageModule)
  },
  {
    path: 'kitcosmeticos',
    loadChildren: () => import('./kitcosmeticos/kitcosmeticos.module').then( m => m.KitcosmeticosPageModule)
  },
  {
    path: 'garrafatermica',
    loadChildren: () => import('./garrafatermica/garrafatermica.module').then( m => m.GarrafatermicaPageModule)
  },
  {
    path: 'copos',
    loadChildren: () => import('./copos/copos.module').then( m => m.CoposPageModule)
  },
  {
    path: 'ecobag',
    loadChildren: () => import('./ecobag/ecobag.module').then( m => m.EcobagPageModule)
  },
  {
    path: 'utensilioscozinha',
    loadChildren: () => import('./utensilioscozinha/utensilioscozinha.module').then( m => m.UtensilioscozinhaPageModule)
  },
  {
    path: 'sacola',
    loadChildren: () => import('./sacola/sacola.module').then( m => m.SacolaPageModule)
  },
  {
    path: 'oleonatural',
    loadChildren: () => import('./oleonatural/oleonatural.module').then( m => m.OleonaturalPageModule)
  },
  {
    path: 'registrar-organizador',
    loadChildren: () => import('./registrar-organizador/registrar-organizador.module').then(m => m.RegistrarOrganizadorPageModule)
  },
 
 
  {
    path: '**', // Rota de fallback, caso a URL seja inválida
    redirectTo: 'login',
  },
  


 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Carregamento antecipado dos módulos
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

