import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPagosComponent } from './solicitud-pagos.component';

describe('SolicitudPagosComponent', () => {
  let component: SolicitudPagosComponent;
  let fixture: ComponentFixture<SolicitudPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
