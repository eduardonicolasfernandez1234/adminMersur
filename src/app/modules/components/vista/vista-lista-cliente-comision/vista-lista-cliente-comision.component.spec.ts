import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaListaClienteComisionComponent } from './vista-lista-cliente-comision.component';

describe('VistaListaClienteComisionComponent', () => {
  let component: VistaListaClienteComisionComponent;
  let fixture: ComponentFixture<VistaListaClienteComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaListaClienteComisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaListaClienteComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
