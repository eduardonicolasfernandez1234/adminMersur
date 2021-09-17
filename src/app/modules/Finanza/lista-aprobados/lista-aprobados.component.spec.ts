import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAprobadosComponent } from './lista-aprobados.component';

describe('ListaAprobadosComponent', () => {
  let component: ListaAprobadosComponent;
  let fixture: ComponentFixture<ListaAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAprobadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
