import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioContactoComponent } from './usuario-contacto.component';

describe('UsuarioContactoComponent', () => {
  let component: UsuarioContactoComponent;
  let fixture: ComponentFixture<UsuarioContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
