import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { IEvento, IAsistente } from '../../interfaces/asistentes';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  eventos: IEvento[] = [];        
  asistentes: IAsistente[] = [];  
  qrData: string | null = null;   
  loadingQR: boolean = false;     

  constructor(private apicrud: ApicrudService) {}

  ngOnInit() {
    
    this.apicrud.getEventos().subscribe(data => {
      this.eventos = data;
    });

    
    this.apicrud.getAsistentes().subscribe(data => {
      this.asistentes = data;
    });
  }

  /**
   
   * @param evento Evento seleccionado para generar el QR.
   */
  generarQR(evento: IEvento) {
    this.loadingQR = true; 
  
    setTimeout(() => {
      
      const eventoEncontrado = this.eventos.find(e => e.id === evento.id);
  
      if (eventoEncontrado) {
        
        const qrInfo = {
          evento: eventoEncontrado.nombre,
          fecha: eventoEncontrado.fecha,
          estado: eventoEncontrado.estado,
          asistente: 'No asignado',  
        };
  
        
        this.qrData = JSON.stringify(qrInfo);
        console.log('QR Generado:', this.qrData);  
  
      } else {
        console.warn('No se encontró el evento con ID:', evento.id);
        this.qrData = null; 
        alert('Evento no encontrado.');
      }
  
      this.loadingQR = false; 
    }, 500); 
  }
  
}
