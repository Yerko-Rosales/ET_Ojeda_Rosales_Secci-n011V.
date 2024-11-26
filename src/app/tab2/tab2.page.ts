import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  eventos: any[] = []; // Lista de eventos cargados

  constructor(private apicrudService: ApicrudService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  // Cargar los eventos desde el servicio
  cargarEventos() {
    this.apicrudService.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }

  // Función para inscribirse a un evento
  inscribirse(evento: any) {
    // Mostrar mensaje de confirmación de inscripción
    alert(`Te has inscrito exitosamente al evento "${evento.nombre}".`);

    // Actualizar la información en el almacenamiento JSON
    this.apicrudService.updateAsistenteEvento(evento).subscribe(() => {
      console.log(`Evento "${evento.nombre}" registrado en el asistente.`);
    });
  }
}
