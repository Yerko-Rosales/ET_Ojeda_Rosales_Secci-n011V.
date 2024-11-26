import { Component } from '@angular/core';
interface Menu {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu: Menu[] = [
    {
      icon: 'sparkles-outline',
      name: 'Inicio',
      redirecTo: '/tabs/tab1'
    },
    {
      icon: 'person-circle-outline',
      name: 'Eventos', // Cambiado desde "Usuarios"
      redirecTo: '/tabs/tab2'
    },
    {
      icon: 'people-outline', // Cambiado ícono desde "paw-outline"
      name: 'Asistentes', // Cambiado desde "Mascotas"
      redirecTo: '/tabs/tab3'
    },
  ];

  constructor() {}
}
