import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentInjector } from '@angular/core';
import{environment} from 'src/environments/environment'; 
import { INuevoAsistente, IAsistente } from '../../interfaces/asistentes';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApicrudService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpclient: HttpClient) { }

  getAsistentes(): Observable<IAsistente[]> { 
    return this.httpclient.get<IAsistente[]>(`${environment.apiUrl}/asistentes`);
  }

  postAsistente(newAsistente: IAsistente): Observable<IAsistente> { 
    return this.httpclient.post<IAsistente>(`${environment.apiUrl}/asistentes`, newAsistente);
  }

  getAsistenteByID(id: number): Observable<IAsistente> { 
    return this.httpclient.get<IAsistente>(`${environment.apiUrl}/asistentes/${id}`);
  }

  putAsistente(asistente: any): Observable<IAsistente> { 
    return this.httpclient.put<IAsistente>(`${environment.apiUrl}/asistentes/${asistente.id}`, asistente);
  }

  deleteAsistente(asistente: any): Observable<IAsistente> { 
    return this.httpclient.delete<IAsistente>(`${environment.apiUrl}/asistentes/${asistente.id}`);
  }

   
   getEventos(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.apiUrl}/eventos`);
  }

  
  updateAsistente(asistente: IAsistente): Observable<IAsistente> {
    return this.httpclient.put<IAsistente>(
      `${this.apiUrl}/asistentes/${asistente.id}`,
      asistente
    );
  }

  
  

  updateAsistenteEvento(evento: any): Observable<IAsistente> {
    const asistenteId = sessionStorage.getItem('asistenteId'); // ID del asistente logueado
  
    
    if (!asistenteId) {
      console.error("El ID del asistente no está definido en sessionStorage.");
      return throwError(() => new Error("No se encontró el ID del asistente."));
    }
  
    
    const asistente = {
      eventoId: evento.id,
      evento: evento.nombre
    };
  
    
    return this.httpclient.patch<IAsistente>(
      `http://localhost:3000/asistentes/${asistenteId}`,
      asistente
    );
  }
  
  
}
