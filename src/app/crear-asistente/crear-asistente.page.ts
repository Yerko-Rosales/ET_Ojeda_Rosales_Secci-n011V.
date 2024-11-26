import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { IAsistente } from '../../interfaces/asistentes';

@Component({
  selector: 'app-crear-asistente',
  templateUrl: './crear-asistente.page.html',
  styleUrls: ['./crear-asistente.page.scss'],
})
export class CrearAsistentePage implements OnInit {
  registroForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  registrarAsistente() {
    if (this.registroForm.valid) {
      const nuevoAsistente: IAsistente = {
        id: Math.floor(Math.random() * 1000000), // Generar un ID aleatorio
        nombre: this.registroForm.value.nombre,
        evento: '', // No asigna evento al registrarse
        estado: true, // Se registra activo
        password: this.registroForm.value.password,
      };

      this.authService.PostAsistente(nuevoAsistente).subscribe(
        () => {
          this.mostrarMensaje('Registro exitoso', 'Su cuenta ha sido creada.');
          this.router.navigateByUrl('/inicio'); // Redirige al inicio de sesión
        },
        (error) => {
          console.error('Error al registrar:', error);
          this.mostrarMensaje('Error', 'No se pudo crear la cuenta. Intente nuevamente.');
        }
      );
    } else {
      this.mostrarMensaje('Datos inválidos', 'Por favor, complete el formulario correctamente.');
    }
  }

  async mostrarMensaje(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
