import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuarioDocumentoComponent } from './edit-usuario-documento.component';

describe('EditUsuarioDocumentoComponent', () => {
  let component: EditUsuarioDocumentoComponent;
  let fixture: ComponentFixture<EditUsuarioDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUsuarioDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsuarioDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
