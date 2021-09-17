import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePlataformaComponent } from './cliente-plataforma.component';

describe('ClientePlataformaComponent', () => {
  let component: ClientePlataformaComponent;
  let fixture: ComponentFixture<ClientePlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientePlataformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
