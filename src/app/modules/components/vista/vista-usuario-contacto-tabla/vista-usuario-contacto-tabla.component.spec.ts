import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUsuarioContactoTablaComponent } from './vista-usuario-contacto-tabla.component';

describe('VistaUsuarioContactoTablaComponent', () => {
  let component: VistaUsuarioContactoTablaComponent;
  let fixture: ComponentFixture<VistaUsuarioContactoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaUsuarioContactoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaUsuarioContactoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
