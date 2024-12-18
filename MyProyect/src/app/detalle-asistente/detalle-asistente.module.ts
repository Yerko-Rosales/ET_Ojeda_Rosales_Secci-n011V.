import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAsistentePageRoutingModule } from './detalle-asistente-routing.module'; // Renombrado
import { DetalleAsistentePage } from './detalle-asistente.page'; // Renombrado
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    DetalleAsistentePageRoutingModule // Renombrado
  ],
  declarations: [DetalleAsistentePage] // Renombrado
})
export class DetalleAsistentePageModule {} // Renombrado
