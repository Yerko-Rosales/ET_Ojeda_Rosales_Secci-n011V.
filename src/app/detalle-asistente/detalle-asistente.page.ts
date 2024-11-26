import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IAsistente } from '../../interfaces/asistentes';
import { ApicrudService } from '../services/apicrud.service';
import { AsistenteQr } from '../../interfaces/asistentes';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detalle-asistente',
  templateUrl: './detalle-asistente.page.html',
  styleUrls: ['./detalle-asistente.page.scss'],
})
export class DetalleAsistentePage implements OnInit {
  
  asistente: IAsistente = { id: 0, nombre: '', evento: '', estado: false, password: '' };
  qrdata: string = '';
  nombreUsuario: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private apicrudService: ApicrudService,
    private authService: AuthService
  ) {
    this.nombreUsuario = sessionStorage.getItem('username');
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['asistente']) {
        this.asistente = JSON.parse(params['asistente']);
      }
    });
  }

  volver() {
    this.router.navigate(['/tabs/tab3']);
  }

  actualizarAsistente(asistente: IAsistente) {
    this.router.navigate(['/actualizar', asistente.id], {
      queryParams: { asistente: JSON.stringify(asistente) },
    });
  }

  async consultaElimina() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Desea eliminar al asistente?',
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.elimina();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/tabs/tab3']);
          },
        },
      ],
    });

    await alert.present();
  }

  elimina() {
    this.apicrudService.deleteAsistente(this.asistente).subscribe(() => {
      this.mensajeEliminacion();
    });
  }

  async mensajeEliminacion() {
    const alert = await this.alertController.create({
      header: 'Eliminando Asistente',
      message: 'El asistente ha sido eliminado.',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab3']);
          },
        },
      ],
    });
    await alert.present();
  }

  generarQr() {
    this.qrdata = `${this.asistente.nombre} - ${this.asistente.evento} - ${this.nombreUsuario}`;
    console.log('QR generado:', this.qrdata);

    const newQr: AsistenteQr = {
      nombreAsistente: this.asistente.nombre,
      eventoAsistente: this.asistente.evento,
      nombreUsuario: this.nombreUsuario || '',
    };

    this.authService.PostQr(newQr).subscribe(() => {
      this.mostrarMensajeQr();
    });
  }

  async mostrarMensajeQr() {
    const alert = await this.alertController.create({
      header: 'QR Generado',
      message: 'El código QR ha sido almacenado exitosamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
