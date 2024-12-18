import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAsistentePage } from './detalle-asistente.page'; // Renombrado

const routes: Routes = [
  {
    path: '',
    component: DetalleAsistentePage // Renombrado
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAsistentePageRoutingModule {} // Renombrado
