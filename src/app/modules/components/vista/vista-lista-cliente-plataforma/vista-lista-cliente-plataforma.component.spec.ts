import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaListaClientePlataformaComponent } from './vista-lista-cliente-plataforma.component';

describe('VistaListaClientePlataformaComponent', () => {
  let component: VistaListaClientePlataformaComponent;
  let fixture: ComponentFixture<VistaListaClientePlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaListaClientePlataformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaListaClientePlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
