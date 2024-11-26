import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { IEvento } from '../../interfaces/asistentes'; 
import { IAsistente } from '../../interfaces/asistentes'; 
import { QRCodeModule } from 'angularx-qrcode'; 

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  eventos: IEvento[] = []; 
  asistentes: IAsistente[] = []; 
  qrData: string | null = null; 
  constructor(private apicrud: ApicrudService) {}

  ngOnInit() {
    
    this.apicrud.getEventos().subscribe(data => {
      this.eventos = data;
    });

    this.apicrud.getAsistentes().subscribe(data => {
      this.asistentes = data;
    });
  }

  
  generarQR(evento: IEvento) {
    
    const asistente = this.asistentes.find(a => a.id === evento.asistente.id); 
    
    if (evento && asistente) {
     
      const qrInfo = `Evento: ${evento.nombre}, Asistente: ${asistente.nombre}`;
      
     
      this.qrData = qrInfo;
      
      console.log('Generando QR con la información:', qrInfo);
    } else {
      console.log('Falta información del evento o asistente');
    }
  }
}
