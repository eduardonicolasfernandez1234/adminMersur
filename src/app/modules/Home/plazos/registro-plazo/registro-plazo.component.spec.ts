import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPlazoComponent } from './registro-plazo.component';

describe('RegistroPlazoComponent', () => {
  let component: RegistroPlazoComponent;
  let fixture: ComponentFixture<RegistroPlazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPlazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPlazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
