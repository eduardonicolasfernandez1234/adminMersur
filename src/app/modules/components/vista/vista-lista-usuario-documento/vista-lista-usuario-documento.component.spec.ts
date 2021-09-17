import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaListaUsuarioDocumentoComponent } from './vista-lista-usuario-documento.component';

describe('VistaListaUsuarioDocumentoComponent', () => {
  let component: VistaListaUsuarioDocumentoComponent;
  let fixture: ComponentFixture<VistaListaUsuarioDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaListaUsuarioDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaListaUsuarioDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
