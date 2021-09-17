import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTableProveedorComponent } from './information-table-proveedor.component';

describe('InformationTableProveedorComponent', () => {
  let component: InformationTableProveedorComponent;
  let fixture: ComponentFixture<InformationTableProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationTableProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationTableProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
