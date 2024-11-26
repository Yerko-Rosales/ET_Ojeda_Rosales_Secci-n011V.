import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  asistente: any; // Renombrado desde "usuario"

  constructor(private activated: ActivatedRoute, 
              private router: Router) { 
    this.activated.queryParams.subscribe(params => {
      this.asistente = JSON.parse(params['asistente']); // Adaptado para "asistente"
    });
  }

  ngOnInit() {}

  regresar() {
    this.router.navigate(['/tabs/tab2']); // Verifica si esta ruta es correcta para tu aplicación
  }
}
