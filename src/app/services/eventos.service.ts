import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseUrl = 'http://localhost/app';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_eventos.php`);
  }

  addEvento(evento: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_event.php`, evento);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload_image.php`, formData);
  }
}
