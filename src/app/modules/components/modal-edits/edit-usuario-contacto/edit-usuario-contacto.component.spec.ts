import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuarioContactoComponent } from './edit-usuario-contacto.component';

describe('EditUsuarioContactoComponent', () => {
  let component: EditUsuarioContactoComponent;
  let fixture: ComponentFixture<EditUsuarioContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUsuarioContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsuarioContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
