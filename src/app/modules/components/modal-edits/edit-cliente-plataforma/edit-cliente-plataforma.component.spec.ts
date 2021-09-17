import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientePlataformaComponent } from './edit-cliente-plataforma.component';

describe('EditClientePlataformaComponent', () => {
  let component: EditClientePlataformaComponent;
  let fixture: ComponentFixture<EditClientePlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClientePlataformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientePlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
