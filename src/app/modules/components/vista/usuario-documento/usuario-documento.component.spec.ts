import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDocumentoComponent } from './usuario-documento.component';

describe('UsuarioDocumentoComponent', () => {
  let component: UsuarioDocumentoComponent;
  let fixture: ComponentFixture<UsuarioDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
