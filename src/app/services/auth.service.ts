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

  
  GetAllAsistentes(): Observable<IAsistente[]> {
    return this.httpclient.get<IAsistente[]>(`${environment.apiUrl}/asistentes`);
  }

  
  GetAsistenteByNombre(nombre: string): Observable<IAsistente> {
    return this.httpclient.get<IAsistente>(`${environment.apiUrl}/asistentes/?nombre=${nombre}`);
  }

  
  IsLoggedIn(): boolean {
    return sessionStorage.getItem('nombre') != null;
  }

  
  PostAsistente(newAsistente: INuevoAsistente): Observable<INuevoAsistente> {
    return this.httpclient.post<INuevoAsistente>(`${environment.apiUrl}/asistentes`, newAsistente);
  }

  
  GetAsistenteById(id: number): Observable<IAsistente> {
    return this.httpclient.get<IAsistente>(`${environment.apiUrl}/asistentes/${id}`);
  }

  
  PostQr(newQr: AsistenteQr): Observable<AsistenteQrCompleto> {
    return this.httpclient.post<AsistenteQrCompleto>(`${environment.apiUrl}/qr`, newQr);
  }
}
