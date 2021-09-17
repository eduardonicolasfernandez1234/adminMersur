import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUsuarioDocumentoTablaComponent } from './vista-usuario-documento-tabla.component';

describe('VistaUsuarioDocumentoTablaComponent', () => {
  let component: VistaUsuarioDocumentoTablaComponent;
  let fixture: ComponentFixture<VistaUsuarioDocumentoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaUsuarioDocumentoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaUsuarioDocumentoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
