import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionUsuariosComponent } from './configuracion-usuarios.component';

describe('ConfiguracionUsuariosComponent', () => {
  let component: ConfiguracionUsuariosComponent;
  let fixture: ComponentFixture<ConfiguracionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
