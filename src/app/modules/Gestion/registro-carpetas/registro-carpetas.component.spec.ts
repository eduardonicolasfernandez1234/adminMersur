import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCarpetasComponent } from './registro-carpetas.component';

describe('RegistroCarpetasComponent', () => {
  let component: RegistroCarpetasComponent;
  let fixture: ComponentFixture<RegistroCarpetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCarpetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCarpetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
