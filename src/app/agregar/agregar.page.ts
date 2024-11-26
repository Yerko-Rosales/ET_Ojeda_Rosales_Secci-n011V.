import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { Router } from '@angular/router';
import { IAsistente } from '../../interfaces/asistentes';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  // Objeto inicializado siguiendo la interfaz IAsistente
  asistente: IAsistente = {
    id: 0,               // Identificador inicial predeterminado
    password: "",        // Contraseña vacía al inicio
    nombre: "",          // Nombre vacío
    evento: "",          // Evento vacío
    estado: false        // Estado predeterminado como inactivo
  };

  constructor(private apicrud: ApicrudService, 
              private router: Router) {}

  ngOnInit() {}

  CrearAsistente() {
    // Aseguramos que se envíen datos válidos antes de llamar al servicio
    if (this.asistente.nombre && this.asistente.evento && this.asistente.password) {
      this.apicrud.postAsistente(this.asistente).subscribe(() => {
        // Redirige al listado de asistentes después de crear uno nuevo
        this.router.navigate(['/tabs/tab3']);
      });
    } else {
      console.error("Faltan datos obligatorios para crear un asistente");
    }
  }
}
