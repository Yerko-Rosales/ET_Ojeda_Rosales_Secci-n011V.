import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { IAsistente } from '../../interfaces/asistentes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  asistentes: IAsistente[] = []; 

  constructor(private apicrud: ApicrudService,
              private router: Router) {}

  ngOnInit() {
    this.apicrud.getAsistentes().subscribe(data => { 
      this.asistentes = data;
    });
  }

  verDetalleAsistente(asistente: any) { 
    this.router.navigate(['/detalle-asistente'], {
      queryParams: { asistente: JSON.stringify(asistente) } 
    });
  }

  agregarAsistente() { 
    this.router.navigate(['/agregar']);
  }
}
