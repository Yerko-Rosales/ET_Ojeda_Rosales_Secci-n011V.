import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  asistente: any; // Adaptación desde "mascota"
  detalleAsistente = { // Renombrado desde "animalito"
    id: "",
    nombre: "",
    evento: "", // Renombrado y adaptado desde "tipo"
    estado: "" // Renombrado desde "color"
  };

  constructor(private apicrud: ApicrudService, private alertcontroller: AlertController, 
              private router: Router,
              private activated: ActivatedRoute) { 
                this.activated.queryParams.subscribe(param => {
                  this.asistente = JSON.parse(param['asistente']); // Adaptación
                });
              }

  ngOnInit() {
    this.detalleAsistente = this.asistente; // Adaptación
  }

  updateAsistente() { // Renombrado desde "updateAnimalito"
    this.apicrud.putAsistente(this.detalleAsistente).subscribe(); // Cambiado método para "asistentes"
    this.mostrarMensaje();
  }

  async mostrarMensaje() { // Renombrado desde "mensaje"
    const alert = await this.alertcontroller.create({
      header: 'Actualización de Asistente',
      message: 'El asistente ha sido actualizado exitosamente.',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab1']); // Ajustar ruta según la estructura de navegación
          },
        },
      ],
    });

    await alert.present();
  }

}
