import { TestBed } from '@angular/core/testing';

import { OpcionesRutasService } from './opciones-rutas.service';

describe('OpcionesRutasService', () => {
  let service: OpcionesRutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionesRutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
