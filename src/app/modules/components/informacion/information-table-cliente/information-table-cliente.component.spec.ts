import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTableClienteComponent } from './information-table-cliente.component';

describe('InformationTableClienteComponent', () => {
  let component: InformationTableClienteComponent;
  let fixture: ComponentFixture<InformationTableClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationTableClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationTableClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
