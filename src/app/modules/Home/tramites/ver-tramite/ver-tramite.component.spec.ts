import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTramiteComponent } from './ver-tramite.component';

describe('VerTramiteComponent', () => {
  let component: VerTramiteComponent;
  let fixture: ComponentFixture<VerTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTramiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
