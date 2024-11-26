import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { IEvento } from '../../interfaces/asistentes'; // Asegúrate de tener esta interfaz bien definida
import { IAsistente } from '../../interfaces/asistentes'; // Si necesitas la información del asistente
import { QRCodeModule } from 'angularx-qrcode'; // Asegúrate de tener este módulo importado

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  eventos: IEvento[] = []; // Lista de eventos
  asistentes: IAsistente[] = []; // Lista de asistentes
  qrData: string | null = null; // Variable para almacenar los datos del QR

  constructor(private apicrud: ApicrudService) {}

  ngOnInit() {
    // Obtener la lista de eventos y asistentes desde tu servicio o archivo JSON
    this.apicrud.getEventos().subscribe(data => {
      this.eventos = data;
    });

    this.apicrud.getAsistentes().subscribe(data => {
      this.asistentes = data;
    });
  }

  // Función para generar el QR
  generarQR(evento: IEvento) {
    // Tomar solo los datos más básicos del evento y el asistente
    const asistente = this.asistentes.find(a => a.id === evento.asistente.id); // Cambia 'asistente' por el nombre correcto del campo en el evento

    if (evento && asistente) {
      // Generar el QR solo con los datos del evento y asistente
      const qrInfo = `Evento: ${evento.nombre}, Asistente: ${asistente.nombre}`;
      
      // Asignar la cadena para generar el QR
      this.qrData = qrInfo;
      
      console.log('Generando QR con la información:', qrInfo);
    } else {
      console.log('Falta información del evento o asistente');
    }
  }
}
