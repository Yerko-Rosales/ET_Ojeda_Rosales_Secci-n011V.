import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAsistente } from '../../interfaces/asistentes';// Importa la interfaz adecuada

@Injectable({
  providedIn: 'root'
})
export class ApiusersService {

  apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL de ejemplo

  constructor(private httpclient: HttpClient) { }

  // Obtener todos los asistentes
  getAsistentes(): Observable<IAsistente[]> {
    return this.httpclient.get<IAsistente[]>(this.apiUrl);
  }
}
