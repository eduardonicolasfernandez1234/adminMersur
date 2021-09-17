import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClienteContactoTablaComponent } from './vista-cliente-contacto-tabla.component';

describe('VistaClienteContactoTablaComponent', () => {
  let component: VistaClienteContactoTablaComponent;
  let fixture: ComponentFixture<VistaClienteContactoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaClienteContactoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaClienteContactoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
