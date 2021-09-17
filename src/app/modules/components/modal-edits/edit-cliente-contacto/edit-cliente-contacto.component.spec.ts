import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClienteContactoComponent } from './edit-cliente-contacto.component';

describe('EditClienteContactoComponent', () => {
  let component: EditClienteContactoComponent;
  let fixture: ComponentFixture<EditClienteContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClienteContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClienteContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
