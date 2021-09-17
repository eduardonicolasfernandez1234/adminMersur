import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTableEmpleadoComponent } from './information-table-empleado.component';

describe('InformationTableEmpleadoComponent', () => {
  let component: InformationTableEmpleadoComponent;
  let fixture: ComponentFixture<InformationTableEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationTableEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationTableEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
