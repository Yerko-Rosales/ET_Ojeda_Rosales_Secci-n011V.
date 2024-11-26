import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  asistente: any; 
  constructor(private activated: ActivatedRoute, 
              private router: Router) { 
    this.activated.queryParams.subscribe(params => {
      this.asistente = JSON.parse(params['asistente']); 
    });
  }

  ngOnInit() {}

  regresar() {
    this.router.navigate(['/tabs/tab2']); 
  }
}
