import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaBloqueComponent } from './apertura-bloque.component';

describe('AperturaBloqueComponent', () => {
  let component: AperturaBloqueComponent;
  let fixture: ComponentFixture<AperturaBloqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturaBloqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturaBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
