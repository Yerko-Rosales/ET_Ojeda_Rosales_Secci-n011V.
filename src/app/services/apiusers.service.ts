import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAsistente } from '../../interfaces/asistentes';

@Injectable({
  providedIn: 'root'
})
export class ApiusersService {

  apiUrl = 'http://localhost:3000/asistentes';// Define la URL de la API

  constructor(private httpclient: HttpClient) { }

  
  getAsistentes(): Observable<IAsistente[]> {
    return this.httpclient.get<IAsistente[]>(this.apiUrl);
  }
}
