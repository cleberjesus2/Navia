import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  private apiUrl = 'http://localhost/app'; // Atualize para o caminho correto do seu servidor

  constructor(private http: HttpClient) { }

  // Função de login
  login(email: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login.php`, { email, senha }, { headers });
  }

  // Função de registro
  register(postData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register.php`, postData, { headers });
  }

  // Função para obter o perfil do usuário
  getUserProfile(user_id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('user_id', user_id);

    return this.http.post<any>(`${this.apiUrl}/get_user.php`, body.toString(), { headers });
  }

  // Função para atualizar o perfil do usuário
  updateUserProfile(user_id: string, nome: string, email: string, telefone: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update_user.php`, {
      user_id: user_id,
      nome: nome,
      email: email,
      telefone: telefone
    });
  }

  // Função para obter produtos
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products.php`);
  }
  
  // Função para adicionar um novo produto
  addProduct(nome: string, preco: number, descricao: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/products.php`, {
      nome: nome,
      preco: preco,
      descricao: descricao
    }, { headers });
  }

  // Adicionando funções para eventos
  // Método para listar eventos
  getEventos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar_eventos.php`);
  }

  // Função para adicionar um novo evento
  addEvento(formData: FormData) {
    return this.http.post('http://localhost/app/add_evento.php', formData)
      .pipe(
        catchError((error) => {
          console.error('Erro ao enviar evento:', error);
          return throwError(() => new Error('Erro ao salvar evento'));
        })
      );
  }

  // Função para upload de imagem
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload_image.php`, formData);
  }

  verificarOrganizador(usuarioId: number) {
    return this.http.post('http://localhost/app/verificar_organizador.php', { usuario_id: usuarioId });
  }
  

  registrarOrganizador(organizador: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar-organizador`, organizador);
  }

}
