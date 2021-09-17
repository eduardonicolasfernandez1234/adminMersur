import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClientePlataformaTablaComponent } from './vista-cliente-plataforma-tabla.component';

describe('VistaClientePlataformaTablaComponent', () => {
  let component: VistaClientePlataformaTablaComponent;
  let fixture: ComponentFixture<VistaClientePlataformaTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaClientePlataformaTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaClientePlataformaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
