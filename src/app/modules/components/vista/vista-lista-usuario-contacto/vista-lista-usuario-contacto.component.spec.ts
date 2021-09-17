import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaListaUsuarioContactoComponent } from './vista-lista-usuario-contacto.component';

describe('VistaListaUsuarioContactoComponent', () => {
  let component: VistaListaUsuarioContactoComponent;
  let fixture: ComponentFixture<VistaListaUsuarioContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaListaUsuarioContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaListaUsuarioContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
