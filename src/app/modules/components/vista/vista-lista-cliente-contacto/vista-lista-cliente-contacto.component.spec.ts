import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaListaClienteContactoComponent } from './vista-lista-cliente-contacto.component';

describe('VistaListaClienteContactoComponent', () => {
  let component: VistaListaClienteContactoComponent;
  let fixture: ComponentFixture<VistaListaClienteContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaListaClienteContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaListaClienteContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
