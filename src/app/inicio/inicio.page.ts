import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  asistenteData: any;

  asistente = { 
    id: 0,
    nombre: "", 
    evento: "", 
    estado: false, 
    password: ""
  };

  loginForm: FormGroup;

  constructor(private authservice: AuthService, private router: Router, private toast: ToastController,
              private alertcontroller: AlertController, private builder: FormBuilder) {
    this.loginForm = this.builder.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(3)]), // Renombrado desde "username"
      'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const nombre = this.loginForm.value.nombre; 
    const password = this.loginForm.value.password;

    this.authservice.GetAsistenteByNombre(nombre).subscribe(resp => { 
      this.asistenteData = resp;
      console.log(this.asistenteData);
      if (this.asistenteData.length === 0) {
        this.loginForm.reset();
        this.AsistenteNoExiste(); 
        return;
      }

      this.asistente = {
        id: this.asistenteData[0].id,
        nombre: this.asistenteData[0].nombre,
        password: this.asistenteData[0].password,
        evento: this.asistenteData[0].evento,
        estado: this.asistenteData[0].estado
      };
      if (this.asistente.password !== password) {
        this.loginForm.reset();
        this.ErrorAsistente(); 
        return;
      }
      if (!this.asistente.estado) {
        this.loginForm.reset();
        this.AsistenteInactivo(); 
        return;
      }
      this.IniciarSesion(this.asistente);
    });
  }

  private IniciarSesion(asistente: any) { 
    sessionStorage.setItem('nombre', asistente.nombre); 
    sessionStorage.setItem('password', asistente.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada ' + this.asistente.nombre);
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async AsistenteInactivo() { 
    const alerta = await this.alertcontroller.create({ 
      header: 'Asistente inactivo',
      message: 'Contactar a admin@admin.cl',
      buttons: ['OK']
    });
    alerta.present();
  }

  async ErrorAsistente() { 
    const alerta = await this.alertcontroller.create({ 
      header: 'Error..',
      message: 'Revise sus credenciales',
      buttons: ['OK']
    });
    alerta.present();
  }

  async AsistenteNoExiste() { 
    const alerta = await this.alertcontroller.create({ 
      header: 'No existe...',
      message: 'Debe registrarse..',
      buttons: ['OK']
    });
    alerta.present();
  }

  Registrar() {
    this.router.navigate(['/crear-asistente']); 
  }

}
