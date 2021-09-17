import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRechazadosComponent } from './lista-rechazados.component';

describe('ListaRechazadosComponent', () => {
  let component: ListaRechazadosComponent;
  let fixture: ComponentFixture<ListaRechazadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRechazadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRechazadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
