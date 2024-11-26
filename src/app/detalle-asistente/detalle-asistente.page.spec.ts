import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAsistentePage } from './detalle-asistente.page'; // Renombrado el archivo importado

describe('DetalleAsistentePage', () => { // Cambiado nombre del describe
  let component: DetalleAsistentePage; // Actualizado el tipo del componente
  let fixture: ComponentFixture<DetalleAsistentePage>; // Actualizado el tipo del fixture

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAsistentePage); // Cambiado el componente creado
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
