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

 
  asistente: IAsistente = {
    id: 0,               
    password: "",        
    nombre: "",          
    evento: "",          
    estado: false        
  };

  constructor(private apicrud: ApicrudService, 
              private router: Router) {}

  ngOnInit() {}

  CrearAsistente() {
    
    if (this.asistente.nombre && this.asistente.evento && this.asistente.password) {
      this.apicrud.postAsistente(this.asistente).subscribe(() => {
       
        this.router.navigate(['/tabs/tab3']);
      });
    } else {
      console.error("Faltan datos obligatorios para crear un asistente");
    }
  }
}
