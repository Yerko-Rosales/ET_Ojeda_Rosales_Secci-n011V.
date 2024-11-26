import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INuevoAsistente, IAsistente, AsistenteQr,AsistenteQrCompleto } from '../../interfaces/asistentes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  // Obtener todos los asistentes
  GetAllAsistentes(): Observable<IAsistente[]> {
    return this.httpclient.get<IAsistente[]>(`${environment.apiUrl}/asistentes`);
  }

  // Obtener un asistente por su nombre
  GetAsistenteByNombre(nombre: string): Observable<IAsistente> {
    return this.httpclient.get<IAsistente>(`${environment.apiUrl}/asistentes/?nombre=${nombre}`);
  }

  // Comprobar si hay una sesión activa
  IsLoggedIn(): boolean {
    return sessionStorage.getItem('nombre') != null;
  }

  // Crear un nuevo asistente
  PostAsistente(newAsistente: INuevoAsistente): Observable<INuevoAsistente> {
    return this.httpclient.post<INuevoAsistente>(`${environment.apiUrl}/asistentes`, newAsistente);
  }

  // Obtener un asistente por su ID
  GetAsistenteById(id: number): Observable<IAsistente> {
    return this.httpclient.get<IAsistente>(`${environment.apiUrl}/asistentes/${id}`);
  }

  // Crear un nuevo QR relacionado con un asistente
  PostQr(newQr: AsistenteQr): Observable<AsistenteQrCompleto> {
    return this.httpclient.post<AsistenteQrCompleto>(`${environment.apiUrl}/qr`, newQr);
  }
}
