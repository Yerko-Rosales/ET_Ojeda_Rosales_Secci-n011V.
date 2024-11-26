import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  eventos: any[] = []; 

  constructor(private apicrudService: ApicrudService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  
  cargarEventos() {
    this.apicrudService.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }

  
  inscribirse(evento: any) {
    
    alert(`Te has inscrito exitosamente al evento "${evento.nombre}".`);

    
    this.apicrudService.updateAsistenteEvento(evento).subscribe(() => {
      console.log(`Evento "${evento.nombre}" registrado en el asistente.`);
    });
  }
}
