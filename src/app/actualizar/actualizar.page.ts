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

  asistente: any; 
  detalleAsistente = { 
    id: "",
    nombre: "",
    evento: "", 
    estado: "" 
  };

  constructor(private apicrud: ApicrudService, private alertcontroller: AlertController, 
              private router: Router,
              private activated: ActivatedRoute) { 
                this.activated.queryParams.subscribe(param => {
                  this.asistente = JSON.parse(param['asistente']); 
                });
              }

  ngOnInit() {
    this.detalleAsistente = this.asistente; 
  }

  updateAsistente() { 
    this.apicrud.putAsistente(this.detalleAsistente).subscribe(); 
    this.mostrarMensaje();
  }

  async mostrarMensaje() { 
    const alert = await this.alertcontroller.create({
      header: 'Actualización de Asistente',
      message: 'El asistente ha sido actualizado exitosamente.',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab1']); 
          },
        },
      ],
    });

    await alert.present();
  }

}
