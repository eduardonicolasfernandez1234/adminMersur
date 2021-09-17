import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIncidenciaComponent } from './lista-incidencia.component';

describe('ListaIncidenciaComponent', () => {
  let component: ListaIncidenciaComponent;
  let fixture: ComponentFixture<ListaIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaIncidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
