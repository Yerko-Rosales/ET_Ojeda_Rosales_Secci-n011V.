import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApidatosService } from '../services/apidatos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posteos: any[] = []; 
  asistente: any; 
  // Opciones del carrusel
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3, // Cantidad de imágenes visibles al mismo tiempo
    spaceBetween: 10, // Espacio entre las imágenes
  };

  constructor(
    private menucontroller: MenuController,
    private apidatos: ApidatosService
  ) {}

  ngOnInit(): void {
    this.asistente = sessionStorage.getItem('nombre'); 
    if (!this.asistente) {
      console.error('Asistente no autenticado');
    }
    console.log(this.asistente);
  }

  mostrarMenu() {
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }

  CargarApi() {
    this.apidatos.getPosts().subscribe(resp => {
      console.log(resp);
    });

    this.apidatos.getPosts().subscribe(
      datos => (this.posteos = datos)
    );
  }
}
